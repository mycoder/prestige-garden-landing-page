import { CONFIG, formatPrice, getWhatsAppUrl } from "../config";
import { trackViewContent } from "../lib/pixel";
import ImagePlaceholder from "./ImagePlaceholder";
import { useEffect } from "react";

const dishes = [
  { icon: "🍚", label: "ভাত" },
  { icon: "🥘", label: "খিচুড়ি" },
  { icon: "🍝", label: "নুডলস" },
  { icon: "🥚", label: "ডিম" },
  { icon: "🥦", label: "সবজি" },
  { icon: "♨️", label: "স্টিম/ভাপা" },
];

export default function Hero() {
  useEffect(() => {
    // ViewContent — visitor saw the main product hero
    trackViewContent({ content_name: CONFIG.PRODUCT_NAME, content_ids: [CONFIG.PRODUCT_MODEL] });
  }, []);

  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-emerald-50 via-white to-white">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-8 sm:px-6 sm:py-12 lg:grid-cols-2 lg:gap-12 lg:py-16">
        {/* Product image — high priority on mobile */}
        <div className="order-1 flex justify-center lg:order-2">
          <div className="relative w-full max-w-sm sm:max-w-md">
            <ImagePlaceholder
              src={CONFIG.IMAGES.main}
              alt={`${CONFIG.PRODUCT_NAME} ${CONFIG.PRODUCT_MODEL}`}
              label="[MAIN PRODUCT IMAGE — এখানে প্রোডাক্টের প্রধান ছবি বসবে]"
              aspect="aspect-[4/5]"
              className="w-full rounded-3xl shadow-xl shadow-emerald-900/10"
              priority
            />
            <div className="absolute -bottom-4 -right-2 rounded-2xl bg-white px-4 py-2 text-center shadow-lg ring-1 ring-emerald-100 sm:-right-4">
              <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400 sm:text-xs">
                অফার প্রাইস
              </p>
              <p className="text-lg font-extrabold text-emerald-700 sm:text-xl">
                {formatPrice(CONFIG.OFFER_PRICE)}
              </p>
            </div>
          </div>
        </div>

        {/* Copy */}
        <div className="order-2 flex flex-col items-start gap-5 text-left lg:order-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 sm:text-sm">
            🍳 All-in-One Multipurpose Cooker
          </span>

          <h1 className="text-3xl font-extrabold leading-tight text-slate-900 sm:text-4xl lg:text-[2.6rem]">
            এক কুকারেই প্রতিদিনের প্রয়োজনীয় রান্না!
          </h1>

          <p className="text-base font-medium text-slate-600 sm:text-lg">
            {CONFIG.PRODUCT_NAME} — {CONFIG.PRODUCT_MODEL}
          </p>

          {/* Dish chips */}
          <div className="flex flex-wrap gap-2">
            {dishes.map((d) => (
              <span
                key={d.label}
                className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm"
              >
                <span aria-hidden="true">{d.icon}</span>
                {d.label}
              </span>
            ))}
          </div>

          {/* Price block */}
          <div className="flex w-full flex-col gap-1 rounded-2xl border border-amber-200 bg-amber-50 p-4 sm:w-auto sm:min-w-[280px]">
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-400 line-through sm:text-base">
                {formatPrice(CONFIG.REGULAR_PRICE)}
              </span>
              <span className="rounded-full bg-red-100 px-2 py-0.5 text-xs font-bold text-red-600">
                সাশ্রয় {formatPrice(CONFIG.REGULAR_PRICE - CONFIG.OFFER_PRICE)}
              </span>
            </div>
            <p className="text-3xl font-extrabold text-emerald-700 sm:text-4xl">
              {formatPrice(CONFIG.OFFER_PRICE)}
              <span className="ml-2 text-sm font-medium text-slate-500">মাত্র</span>
            </p>
          </div>

          {/* Trust points */}
          <ul className="grid grid-cols-1 gap-1.5 text-sm text-slate-600 sm:grid-cols-2">
            <li className="flex items-center gap-1.5">🚚 Cash on Delivery</li>
            <li className="flex items-center gap-1.5">🛡️ ১ বছরের Service Warranty</li>
            <li className="flex items-center gap-1.5">🔄 ২৪ ঘণ্টার Replacement Support</li>
            <li className="flex items-center gap-1.5">🍳 Multipurpose Cooking</li>
          </ul>

          {/* CTAs */}
          <div className="flex w-full flex-col gap-3 sm:flex-row">
            <button
              onClick={scrollToOrder}
              className="min-h-[48px] flex-1 rounded-xl bg-emerald-700 px-6 py-3 text-center text-base font-bold text-white shadow-lg shadow-emerald-700/20 transition hover:bg-emerald-800 active:scale-[0.98] sm:flex-none"
            >
              🛒 এখনই অর্ডার করুন
            </button>
            <a
              href={getWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-h-[48px] flex-1 items-center justify-center rounded-xl border-2 border-emerald-700 px-6 py-3 text-center text-base font-bold text-emerald-700 transition hover:bg-emerald-50 active:scale-[0.98] sm:flex-none"
            >
              📲 WhatsApp-এ অর্ডার করুন
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
