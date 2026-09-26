import { CONFIG, formatPrice } from "../config";

export default function AnnouncementBar() {
  return (
    <div className="w-full bg-emerald-800 px-3 py-2 text-center text-xs font-medium text-emerald-50 sm:text-sm">
      🔥 বিশেষ অফার — এখন মাত্র {formatPrice(CONFIG.OFFER_PRICE)} | 🚚 Cash on Delivery Available
    </div>
  );
}
