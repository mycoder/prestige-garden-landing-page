import { CONFIG } from "../config";

const parts = [
  { icon: "🍚", title: "Rice Cooker" },
  { icon: "♨️", title: "Steamer" },
  { icon: "🍳", title: "Frying / Cooking Pan" },
];

export default function Solution() {
  return (
    <section className="bg-emerald-50/60 py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          আপনার রান্নাঘরের জন্য একটি Practical All-in-One Solution
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-slate-600 sm:text-base">
          {CONFIG.PRODUCT_MODEL} এমন একটি multipurpose electric cooker, যা প্রতিদিনের বিভিন্ন
          ধরনের সহজ রান্নায় ব্যবহার করা যায়।
        </p>

        <div className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:gap-4">
          {parts.map((part, i) => (
            <div key={part.title} className="flex items-center gap-3 sm:contents">
              <div className="flex flex-1 flex-col items-center gap-2 rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-slate-100 sm:flex-none sm:w-44">
                <span className="text-3xl" aria-hidden="true">
                  {part.icon}
                </span>
                <span className="text-sm font-bold text-slate-800 sm:text-base">
                  {part.title}
                </span>
              </div>
              {i < parts.length - 1 && (
                <span className="text-2xl font-bold text-emerald-600 sm:mx-1" aria-hidden="true">
                  +
                </span>
              )}
            </div>
          ))}
        </div>

        <div className="mx-auto mt-6 flex max-w-md items-center gap-3">
          <span className="h-px flex-1 bg-emerald-300" />
          <span className="text-lg font-bold text-emerald-700">=</span>
          <span className="h-px flex-1 bg-emerald-300" />
        </div>

        <p className="mt-4 text-center text-xl font-extrabold text-emerald-800 sm:text-2xl">
          All-in-One Multipurpose Cooker
        </p>
      </div>
    </section>
  );
}
