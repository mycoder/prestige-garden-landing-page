import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-base font-bold text-white">{CONFIG.PRODUCT_NAME}</p>
            <p className="mt-1 text-sm text-slate-400">Model: {CONFIG.PRODUCT_MODEL}</p>
          </div>

          <div>
            <p className="text-sm font-bold text-white">কাস্টমার সাপোর্ট</p>
            <p className="mt-2 text-sm text-slate-400">
              WhatsApp:{" "}
              <span className="text-slate-300">
                {CONFIG.WHATSAPP_NUMBER.startsWith("8801X")
                  ? "[WHATSAPP NUMBER HERE]"
                  : CONFIG.WHATSAPP_NUMBER}
              </span>
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-white">Warranty &amp; Policy</p>
            <p className="mt-2 text-sm text-slate-400">{CONFIG.WARRANTY_TEXT}</p>
            <p className="mt-1 text-sm text-slate-400">Return / Replacement Policy</p>
          </div>

          <div>
            <p className="text-sm font-bold text-white">তথ্য</p>
            <p className="mt-2 text-sm text-slate-400">Privacy Policy [PLACEHOLDER]</p>
            <p className="mt-1 text-sm text-slate-400">Terms &amp; Conditions [PLACEHOLDER]</p>
          </div>
        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {CONFIG.PRODUCT_NAME}. সর্বস্বত্ব সংরক্ষিত।
        </div>
      </div>
    </footer>
  );
}
