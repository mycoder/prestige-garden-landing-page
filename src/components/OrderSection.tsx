import { CONFIG, formatPrice } from "../config";
import OrderForm from "./OrderForm";

export default function OrderSection() {
  return (
    <section id="order" className="scroll-mt-16 bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-2xl px-4 sm:px-6">
        <div className="text-center">
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">অর্ডার করুন</h2>
          <p className="mt-2 text-sm text-slate-600 sm:text-base">
            {CONFIG.PRODUCT_NAME} — মাত্র{" "}
            <span className="font-bold text-emerald-700">{formatPrice(CONFIG.OFFER_PRICE)}</span>
          </p>
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-lg ring-1 ring-slate-100 sm:p-8">
          <OrderForm />
        </div>
      </div>
    </section>
  );
}
