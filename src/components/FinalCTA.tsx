import { CONFIG, formatPrice, getWhatsAppUrl } from "../config";

export default function FinalCTA() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="bg-gradient-to-b from-emerald-800 to-emerald-900 py-12 text-white sm:py-16">
      <div className="mx-auto max-w-2xl px-4 text-center sm:px-6">
        <h2 className="text-2xl font-extrabold sm:text-3xl">
          প্রতিদিনের রান্নাকে করুন আরও সহজ
        </h2>
        <p className="mt-2 text-sm text-emerald-100 sm:text-base">
          {CONFIG.PRODUCT_NAME} — {CONFIG.PRODUCT_MODEL}
        </p>

        <p className="mt-6 text-3xl font-extrabold sm:text-4xl">
          আজ মাত্র {formatPrice(CONFIG.OFFER_PRICE)}
        </p>

        <ul className="mx-auto mt-5 flex max-w-md flex-col gap-2 text-sm text-emerald-50 sm:flex-row sm:justify-center sm:gap-6 sm:text-base">
          <li>🚚 Cash on Delivery</li>
          <li>🛡️ ১ বছরের Service Warranty</li>
          <li>🔄 ২৪ ঘণ্টার Replacement Support</li>
        </ul>

        <div className="mx-auto mt-8 flex max-w-md flex-col gap-3 sm:flex-row">
          <button
            onClick={scrollToOrder}
            className="min-h-[50px] flex-1 rounded-xl bg-white px-6 py-3 text-base font-bold text-emerald-800 shadow-lg transition hover:bg-emerald-50 active:scale-[0.98]"
          >
            🛒 এখনই অর্ডার করুন
          </button>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-h-[50px] flex-1 items-center justify-center rounded-xl border-2 border-white px-6 py-3 text-base font-bold text-white transition hover:bg-white/10 active:scale-[0.98]"
          >
            📲 WhatsApp-এ অর্ডার করুন
          </a>
        </div>
      </div>
    </section>
  );
}
