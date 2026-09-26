const uses = [
  { icon: "🍚", name: "ভাত", note: "প্রতিদিনের ভাত সহজে রান্না করুন।" },
  { icon: "🥘", name: "খিচুড়ি", note: "এক পাত্রেই ঝটপট খিচুড়ি তৈরি।" },
  { icon: "🍛", name: "পোলাও", note: "বিশেষ দিনের পোলাওও রান্না করা যায়।" },
  { icon: "🍝", name: "নুডলস", note: "সন্ধ্যার নাস্তায় নুডলস বানানো সহজ।" },
  { icon: "🥚", name: "ডিম", note: "সেদ্ধ ডিম বা হালকা ডিম রান্না।" },
  { icon: "🥦", name: "সবজি", note: "সবজি সেদ্ধ বা হালকা রান্না করা যায়।" },
  { icon: "♨️", name: "স্টিম/ভাপা", note: "ভাপা খাবার তৈরির জন্য উপযোগী।" },
  { icon: "🍳", name: "হালকা রান্না", note: "দৈনন্দিন হালকা রান্নার কাজেও ব্যবহারযোগ্য।" },
];

export default function UsesGrid() {
  return (
    <section id="uses" className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          এক কুকারে যা যা রান্না করা যায়
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 sm:text-base">
          প্রতিদিনের প্রয়োজনীয় রান্নার জন্য {""}
          <span className="font-semibold text-emerald-700">এক কুকারই যথেষ্ট</span>
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
          {uses.map((u) => (
            <div
              key={u.name}
              className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50 p-4 text-center transition hover:border-emerald-200 hover:bg-emerald-50 sm:p-5"
            >
              <span className="text-3xl sm:text-4xl" aria-hidden="true">
                {u.icon}
              </span>
              <span className="text-sm font-bold text-slate-800 sm:text-base">{u.name}</span>
              <span className="text-xs leading-snug text-slate-500 sm:text-sm">{u.note}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
