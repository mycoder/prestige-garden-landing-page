import { CONFIG } from "../config";
import ImagePlaceholder from "./ImagePlaceholder";

export default function GiftSection() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12">
        <ImagePlaceholder
          src={CONFIG.IMAGES.box}
          alt="গিফট হিসেবে প্রোডাক্ট"
          label="[GIFT / PACKAGING IMAGE]"
          aspect="aspect-[4/3]"
          className="w-full rounded-3xl shadow-md"
        />

        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
            বিয়ে, জন্মদিন বা নতুন সংসারের জন্য Practical Gift
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-slate-600 sm:text-base">
            কিচেন অ্যাপ্লায়েন্স এমন একটি গিফট, যা প্রতিদিনের জীবনে ব্যবহার হয়। নতুন সংসার শুরু
            করা দম্পতি, বাসা গোছানো পরিবার কিংবা কাছের মানুষকে উপহার দিতে চাইলে এটি একটি
            practical পছন্দ হতে পারে।
          </p>
          <p className="mt-4 rounded-2xl bg-amber-50 p-4 text-sm font-semibold text-amber-800 sm:text-base">
            শুধু সুন্দর নয়—এমন একটি gift দিন, যা প্রতিদিন কাজে লাগবে।
          </p>
        </div>
      </div>
    </section>
  );
}
