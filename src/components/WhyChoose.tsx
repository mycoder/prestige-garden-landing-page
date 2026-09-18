const benefits = [
  { icon: "🍳", title: "একাধিক কাজে ব্যবহারযোগ্য" },
  { icon: "⚡", title: "গ্যাস ছাড়াই বিদ্যুতে রান্না" },
  { icon: "🏠", title: "ছোট পরিবার ও দৈনন্দিন রান্নার জন্য উপযোগী" },
  { icon: "🎓", title: "মেস ও হোস্টেলের জন্য practical" },
  { icon: "👍", title: "ব্যবহার সহজ" },
  { icon: "🔌", title: "একটি appliance-এ বিভিন্ন রান্নার সুবিধা" },
  { icon: "🎁", title: "গিফট হিসেবেও উপযোগী" },
];

export default function WhyChoose() {
  return (
    <section className="bg-emerald-50/60 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          কেন এই কুকার বেছে নেবেন?
        </h2>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b.title}
              className="flex items-center gap-4 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100 sm:p-5"
            >
              <span
                className="flex h-11 w-11 flex-none items-center justify-center rounded-full bg-emerald-100 text-xl"
                aria-hidden="true"
              >
                {b.icon}
              </span>
              <p className="text-sm font-semibold text-slate-800 sm:text-base">{b.title}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
