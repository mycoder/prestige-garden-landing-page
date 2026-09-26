import { CONFIG, SAVE_AMOUNT, formatPrice } from "../config";

export default function PriceOffer() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-emerald-800 py-12 text-white sm:py-16">
      <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
        <span className="inline-block rounded-full bg-white/10 px-4 py-1 text-xs font-semibold tracking-wide sm:text-sm">
          বিশেষ অফার
        </span>
        <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">আজই অর্ডার করুন, সাশ্রয় করুন</h2>

        <div className="mx-auto mt-8 flex max-w-sm flex-col items-center gap-2 rounded-3xl bg-white p-6 text-slate-900 shadow-xl sm:p-8">
          <p className="text-sm font-medium text-slate-400 line-through sm:text-base">
            নিয়মিত মূল্য: {formatPrice(CONFIG.REGULAR_PRICE)}
          </p>
          <p className="text-4xl font-extrabold text-emerald-700 sm:text-5xl">
            {formatPrice(CONFIG.OFFER_PRICE)}
          </p>
          <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-bold text-red-600 sm:text-sm">
            আপনি সাশ্রয় করছেন {formatPrice(SAVE_AMOUNT)}
          </span>

          <button
            onClick={scrollToOrder}
            className="mt-4 min-h-[48px] w-full rounded-xl bg-emerald-700 px-6 py-3 text-base font-bold text-white shadow-lg transition hover:bg-emerald-800 active:scale-[0.98]"
          >
            🛒 {formatPrice(CONFIG.OFFER_PRICE)}-এ এখনই অর্ডার করুন
          </button>
        </div>
      </div>
    </section>
  );
}
