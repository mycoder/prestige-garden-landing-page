const items = [
  { icon: "🚚", label: "Cash on Delivery" },
  { icon: "🛡️", label: "১ বছরের Service Warranty" },
  { icon: "🔄", label: "২৪ ঘণ্টার Replacement Support" },
  { icon: "🍳", label: "Multipurpose Cooking" },
];

export default function TrustStrip() {
  return (
    <section className="border-y border-slate-100 bg-white">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-4 px-4 py-5 sm:grid-cols-4 sm:gap-6 sm:px-6 sm:py-6">
        {items.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center gap-1.5 text-center sm:flex-row sm:justify-center sm:gap-2 sm:text-left"
          >
            <span className="text-xl sm:text-2xl" aria-hidden="true">
              {item.icon}
            </span>
            <span className="text-xs font-semibold leading-tight text-slate-700 sm:text-sm">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
