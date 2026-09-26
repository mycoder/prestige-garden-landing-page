const scenarios = [
  { icon: "🍳", title: "সকালের নাস্তা", note: "ডিম বা হালকা নাস্তা তৈরি করুন সহজে।" },
  { icon: "🍚", title: "দুপুরের ভাত", note: "প্রতিদিনের ভাত রান্না ঝামেলাহীন।" },
  { icon: "🍝", title: "সন্ধ্যার নুডলস", note: "দ্রুত ও সহজে নুডলস তৈরি করা যায়।" },
  { icon: "🥘", title: "খিচুড়ি", note: "এক পাত্রেই খিচুড়ি রান্নার সুবিধা।" },
  { icon: "♨️", title: "ভাপা খাবার", note: "স্টিম/ভাপা খাবারের জন্য উপযোগী।" },
  { icon: "🏠", title: "ছোট পরিবারের রান্না", note: "কম জায়গায় প্রয়োজনীয় রান্না।" },
  { icon: "🎓", title: "মেস/হোস্টেল", note: "সীমিত ব্যবস্থায়ও রান্নার সুবিধা।" },
];

export default function DailyLife() {
  return (
    <section className="bg-slate-50 py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          দৈনন্দিন জীবনে যেভাবে কাজে লাগবে
        </h2>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {scenarios.map((s) => (
            <div
              key={s.title}
              className="flex flex-col gap-1.5 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-slate-100"
            >
              <span className="text-2xl" aria-hidden="true">
                {s.icon}
              </span>
              <p className="text-sm font-bold text-slate-800">{s.title}</p>
              <p className="text-xs leading-snug text-slate-500">{s.note}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
