import { CONFIG, formatPrice, getWhatsAppUrl } from "../config";

export default function StickyCTA() {
  const scrollToOrder = () => {
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-slate-200 bg-white/95 p-2.5 shadow-[0_-4px_12px_rgba(0,0,0,0.08)] backdrop-blur sm:hidden">
      <a
        href={getWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="WhatsApp-এ অর্ডার করুন"
        className="flex min-h-[48px] w-14 flex-none items-center justify-center rounded-xl border-2 border-emerald-700 text-xl text-emerald-700"
      >
        📲
      </a>
      <button
        onClick={scrollToOrder}
        className="min-h-[48px] flex-1 rounded-xl bg-emerald-700 px-4 text-sm font-bold text-white shadow-md active:scale-[0.98]"
      >
        🛒 এখনই অর্ডার করুন — {formatPrice(CONFIG.OFFER_PRICE)}
      </button>
    </div>
  );
}
