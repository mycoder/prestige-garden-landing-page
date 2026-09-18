import { useState } from "react";
import { CONFIG } from "../config";

const faqs = [
  {
    q: "এই কুকারে কী কী রান্না করা যায়?",
    a: "ভাত, খিচুড়ি, পোলাও, নুডলস, ডিম, সবজি, হালকা রান্না এবং স্টিম/ভাপা খাবার তৈরি করা যায়।",
  },
  {
    q: "এটি কি গ্যাস ছাড়া ব্যবহার করা যায়?",
    a: "হ্যাঁ। এটি বিদ্যুৎ ব্যবহার করে রান্না করার জন্য তৈরি।",
  },
  {
    q: "Cash on Delivery আছে?",
    a: "হ্যাঁ, Cash on Delivery সুবিধা রয়েছে।",
  },
  {
    q: "Warranty আছে?",
    a: `হ্যাঁ, ${CONFIG.WARRANTY_TEXT} রয়েছে।`,
  },
  {
    q: "Product পাওয়ার পর সমস্যা হলে কী করব?",
    a: "পণ্য হাতে পাওয়ার ২৪ ঘণ্টার মধ্যে ছবি বা ভিডিওসহ যোগাযোগ করতে হবে। যাচাইয়ের পর replacement policy অনুযায়ী ব্যবস্থা নেওয়া হবে।",
  },
  {
    q: "এটি কার জন্য উপযোগী?",
    a: "ছোট পরিবার, গৃহিণী, নববিবাহিত দম্পতি, bachelor, mess/hostel এবং practical kitchen appliance খুঁজছেন এমন মানুষের জন্য উপযোগী।",
  },
  {
    q: "দাম কত?",
    a: `Regular price ৳${CONFIG.REGULAR_PRICE.toLocaleString("en-BD")}, বর্তমান offer price ৳${CONFIG.OFFER_PRICE.toLocaleString("en-BD")}।`,
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          সচরাচর জিজ্ঞাসা (FAQ)
        </h2>

        <div className="mt-8 space-y-3">
          {faqs.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${index}`}
                  className="flex w-full min-h-[48px] items-center justify-between gap-4 px-4 py-3.5 text-left text-sm font-bold text-slate-800 sm:px-5 sm:text-base"
                >
                  <span>{item.q}</span>
                  <span
                    className={`flex-none text-xl text-emerald-600 transition-transform ${isOpen ? "rotate-45" : ""}`}
                    aria-hidden="true"
                  >
                    +
                  </span>
                </button>
                {isOpen && (
                  <div
                    id={`faq-panel-${index}`}
                    className="px-4 pb-4 text-sm leading-relaxed text-slate-600 sm:px-5 sm:text-base"
                  >
                    {item.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
