const problems = [
  "আলাদা আলাদা appliance ব্যবহার করতে হয়",
  "ছোট রান্নার জন্যও বড় setup দরকার হয়",
  "মেস/হোস্টেলে রান্নার ব্যবস্থা সীমিত থাকে",
  "নতুন সংসারে প্রয়োজনীয় kitchen appliance দরকার হয়",
  "কম জায়গায় practical cooking solution দরকার হয়",
];

export default function ProblemSolution() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          প্রতিদিনের রান্নায় যদি একসাথে অনেক কিছু করার প্রয়োজন হয়?
        </h2>

        <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {problems.map((p) => (
            <li
              key={p}
              className="flex items-start gap-3 rounded-xl bg-slate-50 p-4 text-sm text-slate-700 sm:text-base"
            >
              <span className="mt-0.5 text-emerald-600" aria-hidden="true">
                ●
              </span>
              {p}
            </li>
          ))}
        </ul>

        <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-center text-base font-semibold text-emerald-800 sm:text-lg">
          এই কারণেই একটি সহজ, ব্যবহারযোগ্য All-in-One Cooker হতে পারে আপনার রান্নাঘরের practical
          companion।
        </p>
      </div>
    </section>
  );
}
