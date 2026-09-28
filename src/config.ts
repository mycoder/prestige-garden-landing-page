/**
 * ============================================================
 *  PRODUCT / SITE CONFIGURATION
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
  OFFER_PRICE: 1700,

  // ---------- Google Sheet Order API ----------
  // IMPORTANT:
  // এখানে Google Apps Script Web App-এর /exec URL বসান.
  ORDER_API_ENDPOINT:
    "https://script.google.com/macros/s/AKfycbx8x4WU2EiJ-_pKoG9o8EuDCR6h7kx3iIPpwwKmZ_4Uy6q-9WR3d9PlRz7A_oloZ9qLjA/exec",

  // ---------- Meta Pixel ----------
  PIXEL_ID: "1600235351571725",

  // ---------- Delivery ----------
  DELIVERY: {
    dhakaCharge: "FREE",
    outsideDhakaCharge: "FREE",
    deliveryTime: "Inside Dhaka: 1-3 days, Outside Dhaka: 2-5 days",
    codAvailable: true,
  },

  // ---------- Warranty ----------
  WARRANTY_TEXT: "১ বছরের Service Warranty",

  REPLACEMENT_POLICY:
    "পণ্য হাতে পাওয়ার পর ২৪ ঘণ্টার মধ্যে যদি কোনো সমস্যা থাকে, তাহলে ছবি বা ভিডিও তুলে আমাদের সাথে যোগাযোগ করতে হবে। যাচাইয়ের পর পণ্য পরিবর্তন করে দেওয়া হবে।",

  // ---------- Specifications ----------
  SPECIFICATIONS: [
    { label: "Model", value: "Queen-955" },
    { label: "Capacity", value: "6.5 L" },
    { label: "Power (Wattage)", value: "1100 W" },
    { label: "Voltage", value: "220–240 V" },
    { label: "Inner Pot Material", value: "Non-stick" },
    { label: "Box Accessories", value: "Cable + Free Measuring Cup + Spoon" },
  ],

  // ---------- Images ----------
  IMAGES: {
    main: "/images/product-main.webp",
    open: "/images/product-open.webp",
    cooking: "/images/product-cooking.webp",
    steam: "/images/product-steam.webp",
    box: "/images/product-box.webp",
  },

  // ---------- SEO ----------
  SEO: {
    title:
      "Prestige Garden Queen-955 All-in-One Multipurpose Cooker | ৳1,700 | Cash on Delivery | 1 Year Service Warranty",

    description:
      "Prestige Garden Queen-955 All-in-One Multipurpose Cooker। ভাত, খিচুড়ি, পোলাও, নুডলস, সবজি ও স্টিম/ভাপা খাবার তৈরিতে ব্যবহারযোগ্য। Cash on Delivery ও ১ বছরের Service Warranty।",

    ogImage: "/images/product-main.webp",

    canonicalUrl: "https://familiana.online/",
  },
};

export const SAVE_AMOUNT =
  CONFIG.REGULAR_PRICE - CONFIG.OFFER_PRICE;

export function formatPrice(amount: number): string {
  return `${CONFIG.CURRENCY_SYMBOL}${amount.toLocaleString("en-BD")}`;
}