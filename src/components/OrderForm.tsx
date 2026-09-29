import { useRef, useState, type FormEvent } from "react";
import { CONFIG, formatPrice, getWhatsAppUrl } from "../config";
import {
  trackInitiateCheckout,
  trackLead,
  trackPurchase,
} from "../lib/pixel";

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

// Bangladesh mobile number:
// 01[3-9]XXXXXXXX
const BD_PHONE_REGEX = /^01[3-9]\d{8}$/;

type SubmitStatus =
  | "idle"
  | "submitting"
  | "success"
  | "error";

export default function OrderForm() {
  const [form, setForm] =
    useState<FormState>(initialState);

  const [errors, setErrors] =
    useState<
      Partial<Record<keyof FormState, string>>
    >({});

  const [status, setStatus] =
    useState<SubmitStatus>("idle");

  const [errorMsg, setErrorMsg] =
    useState("");

  const hasStartedCheckout =
    useRef(false);

  const handleFocusStart = () => {
    if (!hasStartedCheckout.current) {
      hasStartedCheckout.current = true;

      trackInitiateCheckout({
        content_name: CONFIG.PRODUCT_NAME,
        content_ids: [CONFIG.PRODUCT_MODEL],
        value: CONFIG.OFFER_PRICE,
        currency: "BDT",
      });
    }
  };

  const validate = (): boolean => {
    const next: Partial<
      Record<keyof FormState, string>
    > = {};

    if (
      !form.name.trim() ||
      form.name.trim().length < 2
    ) {
      next.name = "সঠিক নাম লিখুন";
    }

    if (!BD_PHONE_REGEX.test(form.phone.trim())) {
      next.phone =
        "সঠিক ১১ ডিজিটের মোবাইল নম্বর দিন (যেমন 017XXXXXXXX)";
    }

    if (
      !form.address.trim() ||
      form.address.trim().length < 8
    ) {
      next.address =
        "সম্পূর্ণ ঠিকানা লিখুন";
    }

    if (
      !form.quantity ||
      form.quantity < 1 ||
      form.quantity > 20
    ) {
      next.quantity =
        "পরিমাণ ১ থেকে ২০-এর মধ্যে হতে হবে";
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSubmit = async (
    e: FormEvent
  ) => {
    e.preventDefault();

    if (
      status === "submitting" ||
      status === "success"
    ) {
      return;
    }

    if (!validate()) {
      return;
    }

    setStatus("submitting");
    setErrorMsg("");

    // Lead event
    trackLead({
      content_name: CONFIG.PRODUCT_NAME,
      content_ids: [CONFIG.PRODUCT_MODEL],
      value:
        CONFIG.OFFER_PRICE * form.quantity,
      currency: "BDT",
    });

    const payload = {
      product: CONFIG.PRODUCT_NAME,
      model: CONFIG.PRODUCT_MODEL,
      price: CONFIG.OFFER_PRICE,

      name: form.name.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      district: form.district.trim(),
      area: form.area.trim(),

      quantity: form.quantity,

      sourceUrl: window.location.href,
    };

    const endpoint =
      CONFIG.ORDER_API_ENDPOINT.trim();

    // --------------------------------------------------------
    // Check API configuration
    // --------------------------------------------------------

    if (
      !endpoint ||
      endpoint.includes("PASTE_YOUR_WEB_APP_ID_HERE")
    ) {
      setStatus("error");

      setErrorMsg(
        "অর্ডার সিস্টেম এখনো সংযুক্ত করা হয়নি। অনুগ্রহ করে কিছুক্ষণ পরে আবার চেষ্টা করুন।"
      );

      return;
    }

    try {
      // ------------------------------------------------------
      // IMPORTANT:
      // text/plain avoids CORS preflight with Apps Script.
      // Do NOT change this to application/json.
      // ------------------------------------------------------

      const response = await fetch(
        endpoint,
        {
          method: "POST",
          redirect: "follow",

          headers: {
            "Content-Type":
              "text/plain;charset=utf-8",
          },

          body: JSON.stringify(payload),
        }
      );

      if (!response.ok) {
        throw new Error(
          `Server returned ${response.status}`
        );
      }

      const result = await response.json();

      // ------------------------------------------------------
      // IMPORTANT:
      // Purchase fires ONLY when Apps Script confirms
      // that the order was successfully saved.
      // ------------------------------------------------------

      if (
        !result ||
        result.success !== true ||
        !result.orderId
      ) {
        throw new Error(
          result?.message ||
            "Order was not confirmed by server."
        );
      }

      // Purchase value = actual total order value
      trackPurchase({
        content_name: CONFIG.PRODUCT_NAME,
        content_ids: [CONFIG.PRODUCT_MODEL],
        content_type: "product",
        value:
          CONFIG.OFFER_PRICE * form.quantity,
        currency: "BDT",
        order_id: result.orderId,
        num_items: form.quantity,
      });

      setStatus("success");

    } catch (error) {
      console.error(
        "Order submission error:",
        error
      );

      setStatus("error");

      setErrorMsg(
        "দুঃখিত, অর্ডার পাঠাতে সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।"
      );
    }
  };

  // ==========================================================
  // SUCCESS SCREEN
  // ==========================================================

  if (status === "success") {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 text-center sm:p-8">

      <span
        className="text-4xl"
        aria-hidden="true"
      >
        ✅
      </span>

      <h3 className="mt-3 text-lg font-bold text-emerald-800 sm:text-xl">
        ধন্যবাদ! আপনার অর্ডার গ্রহণ করা হয়েছে
      </h3>

      <p className="mt-2 text-sm text-emerald-700 sm:text-base">
        শীঘ্রই আমাদের প্রতিনিধি আপনার দেওয়া নম্বরে ফোন করে অর্ডার কনফার্ম করবেন।
      </p>

      <div className="mt-5 rounded-xl border border-green-200 bg-white p-4">

        <p className="text-sm font-semibold text-slate-700">
          কোনো প্রশ্ন বা Customer Support-এর প্রয়োজন হলে
        </p>

        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-green-700 active:scale-[0.98]"
        >
          💬 WhatsApp Customer Support
        </a>

        <p className="mt-2 text-xs text-slate-500">
          WhatsApp:{" "}
          {CONFIG.WHATSAPP_NUMBER.replace(
            /^880/,
            "0"
          )}
        </p>

      </div>

      <p className="mt-4 text-xs text-slate-500">
        আপনার অর্ডারটি সফলভাবে আমাদের সিস্টেমে সংরক্ষণ করা হয়েছে।
      </p>

    </div>
  );
}

  // ==========================================================
  // ORDER FORM
  // ==========================================================

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
      noValidate
    >
      {/* NAME */}
      <div>
        <label
          htmlFor="name"
          className="mb-1 block text-sm font-semibold text-slate-700"
        >
          নাম{" "}
          <span className="text-red-500">
            *
          </span>
        </label>

        <input
          id="name"
          name="name"
          type="text"
          autoComplete="name"
          required
          value={form.name}
          onFocus={handleFocusStart}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              name: e.target.value,
            }))
          }
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="আপনার পূর্ণ নাম লিখুন"
          aria-invalid={!!errors.name}
          aria-describedby={
            errors.name
              ? "name-error"
              : undefined
          }
        />

        {errors.name && (
          <p
            id="name-error"
            className="mt-1 text-xs font-medium text-red-600"
          >
            {errors.name}
          </p>
        )}
      </div>

      {/* PHONE */}
      <div>
        <label
          htmlFor="phone"
          className="mb-1 block text-sm font-semibold text-slate-700"
        >
          মোবাইল নম্বর{" "}
          <span className="text-red-500">
            *
          </span>
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
            setForm((f) => ({
              ...f,
              phone: e.target.value
                .replace(/[^\d]/g, ""),
            }))
          }
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="01XXXXXXXXX"
          maxLength={11}
          aria-invalid={!!errors.phone}
          aria-describedby={
            errors.phone
              ? "phone-error"
              : undefined
          }
        />

        {errors.phone && (
          <p
            id="phone-error"
            className="mt-1 text-xs font-medium text-red-600"
          >
            {errors.phone}
          </p>
        )}
      </div>

      {/* ADDRESS */}
      <div>
        <label
          htmlFor="address"
          className="mb-1 block text-sm font-semibold text-slate-700"
        >
          সম্পূর্ণ ঠিকানা{" "}
          <span className="text-red-500">
            *
          </span>
        </label>

        <textarea
          id="address"
          name="address"
          required
          rows={2}
          value={form.address}
          onFocus={handleFocusStart}
          onChange={(e) =>
            setForm((f) => ({
              ...f,
              address: e.target.value,
            }))
          }
          className="w-full resize-none rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
          placeholder="বাসা/হোল্ডিং নম্বর, রোড, এলাকা"
          aria-invalid={!!errors.address}
          aria-describedby={
            errors.address
              ? "address-error"
              : undefined
          }
        />

        {errors.address && (
          <p
            id="address-error"
            className="mt-1 text-xs font-medium text-red-600"
          >
            {errors.address}
          </p>
        )}
      </div>

      {/* DISTRICT + AREA */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label
            htmlFor="district"
            className="mb-1 block text-sm font-semibold text-slate-700"
          >
            জেলা{" "}
            <span className="text-xs font-normal text-slate-400">
              (ঐচ্ছিক)
            </span>
          </label>

          <input
            id="district"
            name="district"
            type="text"
            value={form.district}
            onFocus={handleFocusStart}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                district: e.target.value,
              }))
            }
            className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
            placeholder="যেমন: ঢাকা"
          />
        </div>

        <div>
          <label
            htmlFor="area"
            className="mb-1 block text-sm font-semibold text-slate-700"
          >
            এলাকা{" "}
            <span className="text-xs font-normal text-slate-400">
              (ঐচ্ছিক)
            </span>
          </label>

          <input
            id="area"
            name="area"
            type="text"
            value={form.area}
            onFocus={handleFocusStart}
            onChange={(e) =>
              setForm((f) => ({
                ...f,
                area: e.target.value,
              }))
            }
            className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
            placeholder="যেমন: মিরপুর"
          />
        </div>
      </div>

      {/* QUANTITY */}
      <div className="max-w-[140px]">
        <label
          htmlFor="quantity"
          className="mb-1 block text-sm font-semibold text-slate-700"
        >
          Quantity{" "}
          <span className="text-red-500">
            *
          </span>
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
            setForm((f) => ({
              ...f,
              quantity: Math.min(
                20,
                Math.max(
                  1,
                  Number(e.target.value) || 1
                )
              ),
            }))
          }
          className="min-h-[46px] w-full rounded-xl border border-slate-300 px-4 py-2.5 text-base outline-none ring-emerald-500 focus:border-emerald-500 focus:ring-2"
        />

        {errors.quantity && (
          <p className="mt-1 text-xs font-medium text-red-600">
            {errors.quantity}
          </p>
        )}
      </div>

      {/* TOTAL */}
      <div className="rounded-xl bg-slate-50 p-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-slate-600">
            প্রতি পিস
          </span>

          <span className="font-semibold text-slate-800">
            {formatPrice(
              CONFIG.OFFER_PRICE
            )}
          </span>
        </div>

        <div className="mt-2 flex items-center justify-between border-t border-slate-200 pt-2">
          <span className="font-bold text-slate-800">
            মোট মূল্য
          </span>

          <span className="text-xl font-extrabold text-emerald-700">
            {formatPrice(
              CONFIG.OFFER_PRICE *
                form.quantity
            )}
          </span>
        </div>
      </div>

      {/* ERROR */}
      {status === "error" && (
        <p
          role="alert"
          className="rounded-xl bg-red-50 p-3 text-sm font-medium text-red-700"
        >
          {errorMsg}
        </p>
      )}

      {/* SUBMIT */}
      <button
        type="submit"
        disabled={
          status === "submitting"
        }
        className="min-h-[50px] w-full rounded-xl bg-emerald-700 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
      >
        {status === "submitting"
          ? "অর্ডার পাঠানো হচ্ছে..."
          : "✅ অর্ডার কনফার্ম করুন"}
      </button>

      <p className="text-center text-xs text-slate-400">
        অর্ডার করলে আপনি আমাদের শর্তাবলীতে সম্মত হচ্ছেন বলে গণ্য হবে।
      </p>
    </form>
  );
}