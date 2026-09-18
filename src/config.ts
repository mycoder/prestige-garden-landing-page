/**
 * ============================================================
 *  PRODUCT / SITE CONFIGURATION
 * ============================================================
 *  সব সম্পাদনাযোগ্য (editable) তথ্য এখানে এক জায়গায় রাখা হয়েছে।
 *  পরবর্তীতে তথ্য পরিবর্তন করতে চাইলে শুধু এই ফাইলটি এডিট করুন।
 *  Do NOT hardcode these values anywhere else in the codebase.
 * ============================================================
 */

export const CONFIG = {
  // ---------- Basic product info ----------
  PRODUCT_NAME: "Prestige Garden All-in-One Multipurpose Cooker",
  PRODUCT_MODEL: "Queen-955",
  PRODUCT_CATEGORY: "Kitchen Appliance",

  // ---------- Pricing ----------
  CURRENCY_SYMBOL: "৳",
  REGULAR_PRICE: 2000,
  OFFER_PRICE: 1550,

  // ---------- Contact / Ordering ----------
  // 🔴 TODO: WhatsApp নম্বর বসান (দেশের কোড সহ, যেমন 8801XXXXXXXXX)
  WHATSAPP_NUMBER: "8801XXXXXXXXX", // [WHATSAPP NUMBER HERE]
  WHATSAPP_DEFAULT_MESSAGE:
    "আসসালামু আলাইকুম, আমি Prestige Garden Queen-955 Multipurpose Cooker অর্ডার করতে চাই।",

  // 🔴 TODO: অর্ডার সাবমিট করার জন্য নিজের ব্যাকএন্ড / শীট / API এন্ডপয়েন্ট বসান
  ORDER_API_ENDPOINT: "[ORDER API ENDPOINT HERE]",

  // ---------- Meta (Facebook) Pixel ----------
  // 🔴 TODO: নিজের Meta Pixel ID বসান। খালি রাখলে পিক্সেল লোড হবে না।
  PIXEL_ID: "1600235351571725",

  // ---------- Delivery info (placeholders — do not invent) ----------
  DELIVERY: {
    dhakaCharge: "[ADD CHARGE]",
    outsideDhakaCharge: "[ADD CHARGE]",
    deliveryTime: "[ADD INFORMATION]",
    codAvailable: true,
  },

  // ---------- Warranty / Replacement ----------
  WARRANTY_TEXT: "১ বছরের Service Warranty",
  REPLACEMENT_POLICY:
    "পণ্য হাতে পাওয়ার পর ২৪ ঘণ্টার মধ্যে যদি কোনো সমস্যা থাকে, তাহলে ছবি বা ভিডিও তুলে আমাদের সাথে যোগাযোগ করতে হবে। যাচাইয়ের পর পণ্য পরিবর্তন করে দেওয়া হবে।",

  // ---------- Specifications (placeholders — do not invent) ----------
  SPECIFICATIONS: [
    { label: "Model", value: "Queen-955" },
    { label: "Capacity", value: "[ADD]" },
    { label: "Power (Wattage)", value: "[ADD]" },
    { label: "Voltage", value: "[ADD]" },
    { label: "Inner Pot Material", value: "[ADD]" },
    { label: "Color", value: "[ADD]" },
    { label: "Dimensions", value: "[ADD]" },
    { label: "Weight", value: "[ADD]" },
    { label: "Box Accessories", value: "[ADD]" },
  ],

  // ---------- Images ----------
  // 🔴 TODO: public/images ফোল্ডারে আসল প্রোডাক্ট ছবি রাখুন এবং নিচের path গুলো আপডেট করুন।
  // যতক্ষণ না আসল ছবি দেওয়া হচ্ছে, ততক্ষণ এলিগেন্ট প্লেসহোল্ডার দেখানো হবে।
  IMAGES: {
    main: "/images/product-main.webp", // [MAIN PRODUCT IMAGE]
    open: "/images/product-open.webp", // [PRODUCT OPEN VIEW]
    cooking: "/images/product-cooking.webp", // [COOKING IMAGE]
    steam: "/images/product-steam.webp", // [STEAMING IMAGE]
    box: "/images/product-box.webp", // [PRODUCT BOX IMAGE]
  },

  // ---------- SEO ----------
  SEO: {
    title: "Prestige Garden Queen-955 All-in-One Multipurpose Cooker | ৳1,550",
    description:
      "Prestige Garden Queen-955 All-in-One Multipurpose Cooker। ভাত, খিচুড়ি, পোলাও, নুডলস, সবজি ও স্টিম/ভাপা খাবার তৈরিতে ব্যবহারযোগ্য। Cash on Delivery ও ১ বছরের Service Warranty।",
    ogImage: "/images/product-main.webp", // [OG IMAGE PLACEHOLDER]
    canonicalUrl: "[CANONICAL URL HERE]", // e.g. https://yourdomain.com/
  },
};

export const SAVE_AMOUNT = CONFIG.REGULAR_PRICE - CONFIG.OFFER_PRICE;

export function formatPrice(amount: number): string {
  return `${CONFIG.CURRENCY_SYMBOL}${amount.toLocaleString("en-BD")}`;
}

export function getWhatsAppUrl(customMessage?: string): string {
  const msg = encodeURIComponent(customMessage || CONFIG.WHATSAPP_DEFAULT_MESSAGE);
  return `https://wa.me/${CONFIG.WHATSAPP_NUMBER}?text=${msg}`;
}
