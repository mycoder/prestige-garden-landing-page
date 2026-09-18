import { useRef, useState, type FormEvent } from "react";
import { CONFIG, formatPrice, getWhatsAppUrl } from "../config";
import { trackInitiateCheckout, trackLead, trackPurchase } from "../lib/pixel";

interface FormState {
  name: string;
  phone: string;
  address: string;
  district: string;
  area: string;
  quantity: number;
}

const initialState: FormState = {
  name: "",
  phone: "",
  address: "",
  district: "",
  area: "",
  quantity: 1,
};

// Reasonable Bangladeshi mobile number check: 01[3-9]XXXXXXXX (11 digits total)
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

type SubmitStatus = "idle" | "submitting" | "success" | "error";

export default function OrderForm() {
  const [form, setForm] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const hasStartedCheckout = useRef(false);

  const handleFocusStart = () => {
    if (!hasStartedCheckout.current) {
      hasStartedCheckout.current = true;
      // InitiateCheckout — user has started interacting with the order form
      trackInitiateCheckout({
        content_name: CONFIG.PRODUCT_NAME,
        value: CONFIG.OFFER_PRICE,
        currency: "BDT",
      });
    }
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      next.name = "সঠিক নাম লিখুন";
    }
    if (!BD_PHONE_REGEX.test(form.phone.trim())) {
      next.phone = "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন 017XXXXXXXX)";
    }
    if (!form.address.trim() || form.address.trim().length < 8) {
      next.address = "সম্পূর্ণ ঠিকানা লিখুন";
    }
    if (!form.quantity || form.quantity < 1) {
      next.quantity = "পরিমাণ কমপক্ষে ১ হতে হবে";
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (status === "submitting" || status === "success") return; // prevent double submit

    if (!validate()) return;

    setStatus("submitting");
    setErrorMsg("");

    // Lead — user submitted the order form
    trackLead({
      content_name: CONFIG.PRODUCT_NAME,
      value: CONFIG.OFFER_PRICE,
      currency: "BDT",
    });

    const payload = {
      product: CONFIG.PRODUCT_NAME,
      model: CONFIG.PRODUCT_MODEL,
      price: CONFIG.OFFER_PRICE,
      ...form,
    };

    // 🔴 [ORDER API ENDPOINT HERE] — নিজের ব্যাকএন্ড/শীট/ইকমার্স API যুক্ত করুন
    const endpoint = CONFIG.ORDER_API_ENDPOINT;
    const isEndpointConfigured = !!endpoint && !endpoint.startsWith("[");

    try {
      if (isEndpointConfigured) {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error("Order API failed");

        // 🔴 Purchase — শুধুমাত্র ব্যাকএন্ড থেকে সত্যিকারের সফল response পাওয়ার পরই ফায়ার করুন
        trackPurchase({
          content_name: CONFIG.PRODUCT_NAME,
          value: CONFIG.OFFER_PRICE,
          currency: "BDT",
        });
        setStatus("success");
      } else {
        // Backend not connected yet — do not pretend the order is saved.
        // As a temporary fallback so no lead is lost, we forward the details to WhatsApp.
        setStatus("success");
        const msg = `আসসালামু আলাইকুম, আমি অর্ডার করতে চাই।\nপ্রোডাক্ট: ${CONFIG.PRODUCT_NAME} (${CONFIG.PRODUCT_MODEL})\nনাম: ${form.name}\nমোবাইল: ${form.phone}\nঠিকানা: ${form.address}${form.district ? `, ${form.district}` : ""}${form.area ? `, ${form.area}` : ""}\nপরিমাণ: ${form.quantity}`;
        window.open(getWhatsAppUrl(msg), "_blank", "noopener,noreferrer");
      }
    } catch {
      setStatus("error");
      setErrorMsg("দুঃখিত, অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে WhatsApp-এ যোগাযোগ করুন।");
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">
        <span className="text-4xl" aria-hidden="true">
          ✅
        </span>
        <h3 className="mt-3 text-lg font-bold text-emerald-800 sm:text-xl">
          ধন্যবাদ! আপনার অর্ডার তথ্য গ্রহণ করা হয়েছে
        </h3>
        <p className="mt-2 text-sm text-emerald-700 sm:text-base">
          শীঘ্রই আমাদের প্রতিনিধি আপনার দেওয়া নম্বরে ফোন করে অর্ডার কনফার্ম করবেন।
        </p>
        <p className="mt-4 text-xs text-slate-500">
          (Developer note: {CONFIG.ORDER_API_ENDPOINT.startsWith("[")
            ? "ORDER_API_ENDPOINT এখনো সেট করা হয়নি — WhatsApp fallback ব্যবহার করা হয়েছে।"
            : "অর্ডার সফলভাবে ব্যাকএন্ডে পাঠানো হয়েছে।"}
          )
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="mb-1 block text-sm font-semibold text-slate-700">
          নাম <span className="text-red-500">*</span>
        </label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onFocus={handleFocusStart}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="আপনার পূর্ণ নাম লিখুন"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p id="name-error" className="mt-1 text-xs font-medium text-red-600">
            {errors.name}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="phone" className="mb-1 block text-sm font-semibold text-slate-700">
          মোবাইল নম্বর <span className="text-red-500">*</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          inputMode="numeric"
          autoComplete="tel"
          required
          value={form.phone}
          onFocus={handleFocusStart}
          onChange={(e) =>
            setForm((f) => ({ ...f, phone: e.target.value.replace(/[^\d]/g, "") }))
          }
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="01XXXXXXXXX"
          maxLength={11}
          aria-invalid={!!errors.phone}
          aria-describedby={errors.phone ? "phone-error" : undefined}
        />
        {errors.phone && (
          <p id="phone-error" className="mt-1 text-xs font-medium text-red-600">
            {errors.phone}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="address" className="mb-1 block text-sm font-semibold text-slate-700">
          সম্পূর্ণ ঠিকানা <span className="text-red-500">*</span>
        </label>
        <textarea
          id="address"
          name="address"
          required
          rows={2}
          value={form.address}
          onFocus={handleFocusStart}
          onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="বাসা/হোল্ডিং নম্বর, রোড, এলাকা"
          aria-invalid={!!errors.address}
          aria-describedby={errors.address ? "address-error" : undefined}
        />
        {errors.address && (
          <p id="address-error" className="mt-1 text-xs font-medium text-red-600">
            {errors.address}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="district" className="mb-1 block text-sm font-semibold text-slate-700">
            জেলা <span className="text-xs font-normal text-slate-400">(ঐচ্ছিক)</span>
          </label>
          <input
            id="district"
            name="district"
            type="text"
            value={form.district}
            onFocus={handleFocusStart}
            onChange={(e) => setForm((f) => ({ ...f, district: e.target.value }))}
            className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
            placeholder="যেমন: ঢাকা"
          />
        </div>
        <div>
          <label htmlFor="area" className="mb-1 block text-sm font-semibold text-slate-700">
            এলাকা <span className="text-xs font-normal text-slate-400">(ঐচ্ছিক)</span>
          </label>
          <input
            id="area"
            name="area"
            type="text"
            value={form.area}
            onFocus={handleFocusStart}
            onChange={(e) => setForm((f) => ({ ...f, area: e.target.value }))}
            className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
            placeholder="যেমন: মিরপুর"
          />
        </div>
      </div>

      <div className="max-w-[140px]">
        <label htmlFor="quantity" className="mb-1 block text-sm font-semibold text-slate-700">
          Quantity <span className="text-red-500">*</span>
        </label>
        <input
          id="quantity"
          name="quantity"
          type="number"
          min={1}
          max={20}
          required
          value={form.quantity}
          onFocus={handleFocusStart}
          onChange={(e) =>
            setForm((f) => ({ ...f, quantity: Math.max(1, Number(e.target.value) || 1) }))
          }
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
        />
        {errors.quantity && (
          <p className="mt-1 text-xs font-medium text-red-600">{errors.quantity}</p>
        )}
      </div>

      <div className="flex items-center justify-between rounded-xl bg-slate-50 p-4">
        <span className="text-sm font-semibold text-slate-600">সর্বমোট (পণ্যের মূল্য)</span>
        <span className="text-lg font-extrabold text-emerald-700">
          {formatPrice(CONFIG.OFFER_PRICE * form.quantity)}
        </span>
      </div>

      {status === "error" && (
        <p role="alert" className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700">
          {errorMsg}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="min-h-[50px] w-full rounded-xl bg-emerald-700 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting" ? "পাঠানো হচ্ছে..." : "✅ অর্ডার কনফার্ম করুন"}
      </button>

      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        className="flex min-h-[48px] w-full items-center justify-center rounded-xl border-2 border-emerald-700 px-6 py-3 text-center text-base font-bold text-emerald-700 transition hover:bg-emerald-50 active:scale-[0.98]"
      >
        📲 WhatsApp-এ অর্ডার করুন
      </a>

      <p className="text-center text-xs text-slate-400">
        অর্ডার করলে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন বলে গণ্য হবে।
      </p>
    </form>
  );
}
