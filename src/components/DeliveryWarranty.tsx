import { CONFIG } from "../config";

export default function DeliveryWarranty() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8">
        {/* Delivery */}
        <div className="rounded-3xl border border-slate-100 bg-slate-50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
            🚚 ডেলিভারি তথ্য
          </h2>
          <ul className="mt-4 space-y-3 text-sm text-slate-700 sm:text-base">
            <li className="flex justify-between gap-2 border-b border-slate-200 pb-2">
              <span>Cash on Delivery</span>
              <span className="font-semibold text-emerald-700">
                {CONFIG.DELIVERY.codAvailable ? "উপলব্ধ ✅" : "নেই"}
              </span>
            </li>
            <li className="flex justify-between gap-2 border-b border-slate-200 pb-2">
              <span>ঢাকার ভেতরে চার্জ</span>
              <span className="font-semibold text-slate-500">{CONFIG.DELIVERY.dhakaCharge}</span>
            </li>
            <li className="flex justify-between gap-2 border-b border-slate-200 pb-2">
              <span>ঢাকার বাইরে চার্জ</span>
              <span className="font-semibold text-slate-500">
                {CONFIG.DELIVERY.outsideDhakaCharge}
              </span>
            </li>
            <li className="flex justify-between gap-2">
              <span>ডেলিভারি সময়</span>
              <span className="font-semibold text-slate-500">
                {CONFIG.DELIVERY.deliveryTime}
              </span>
            </li>
          </ul>
        </div>

        {/* Warranty */}
        <div className="rounded-3xl border border-emerald-100 bg-emerald-50 p-6 sm:p-8">
          <h2 className="flex items-center gap-2 text-xl font-extrabold text-slate-900 sm:text-2xl">
            🛡️ কেনার পরও থাকছে Support
          </h2>
          <div className="mt-4 space-y-4 text-sm text-slate-700 sm:text-base">
            <div>
              <p className="font-bold text-emerald-800">Service Warranty</p>
              <p className="mt-1">{CONFIG.WARRANTY_TEXT}</p>
            </div>
            <div>
              <p className="font-bold text-emerald-800">Replacement Policy</p>
              <p className="mt-1 leading-relaxed">{CONFIG.REPLACEMENT_POLICY}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
