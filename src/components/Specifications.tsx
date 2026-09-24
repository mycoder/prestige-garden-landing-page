import { CONFIG } from "../config";

export default function Specifications() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          প্রোডাক্ট স্পেসিফিকেশন
        </h2>
        
        <div className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white">
          {CONFIG.SPECIFICATIONS.map((spec, i) => (
            <div
              key={spec.label}
              className={`flex items-center justify-between gap-4 px-5 py-3.5 text-sm sm:text-base ${
                i % 2 === 0 ? "bg-white" : "bg-slate-50/70"
              }`}
            >
              <span className="font-semibold text-slate-600">{spec.label}</span>
              <span
                className={
                  spec.value.startsWith("[")
                    ? "font-medium text-amber-600"
                    : "font-semibold text-slate-800"
                }
              >
                {spec.value}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
