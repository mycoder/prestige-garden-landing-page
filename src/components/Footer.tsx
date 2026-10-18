import { CONFIG } from "../config";

export default function Footer() {
  return (
    <footer className="bg-slate-900 py-10 text-slate-300">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            {/* Business Logo */}
            <img
              src="/logo.png"
              alt="Prestige Garden Logo"
              className="mb-4 h-14 w-auto max-w-[220px] object-contain"
              width="220"
              height="64"
            />
            
            <p className="text-base font-bold text-white">
              {CONFIG.PRODUCT_NAME}
            </p>
            
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              অর্ডার
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Cash on Delivery available
            </p>

            <p className="mt-1 text-sm text-slate-400">
              অনলাইন অর্ডার ফর্মের মাধ্যমে অর্ডার করুন।
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              Warranty &amp; Policy
            </p>

            <p className="mt-2 text-sm text-slate-400">
              {CONFIG.WARRANTY_TEXT}
            </p>

            <p className="mt-1 text-sm text-slate-400">
              Return / Replacement Policy
            </p>
          </div>

          <div>
            <p className="text-sm font-bold text-white">
              তথ্য
            </p>

            <a
              href="/privacy-policy.html"
              className="mt-2 block text-sm text-slate-400 transition hover:text-white hover:underline"
            >
              Privacy Policy
            </a>

            <a
              href="/terms-and-conditions.html"
              className="mt-2 block text-sm text-slate-400 transition hover:text-white hover:underline"
            >
              Terms &amp; Conditions
            </a>
          </div>

        </div>

        <div className="mt-8 border-t border-slate-800 pt-6 text-center text-xs text-slate-500">
          © {new Date().getFullYear()}{" "}
          {CONFIG.COMPANY_NAME} সর্বস্বত্ব সংরক্ষিত।
        </div>

      </div>
    </footer>
  );
}