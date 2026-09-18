import { CONFIG } from "../config";
import ImagePlaceholder from "./ImagePlaceholder";

const shots = [
  { key: "main", label: "[MAIN PRODUCT IMAGE]", alt: "প্রোডাক্টের প্রধান ছবি" },
  { key: "open", label: "[PRODUCT OPEN VIEW]", alt: "কুকার খোলা অবস্থার ছবি" },
  { key: "cooking", label: "[COOKING IMAGE]", alt: "রান্নার ব্যবহারের ছবি" },
  { key: "steam", label: "[STEAMING IMAGE]", alt: "স্টিম/ভাপা ব্যবহারের ছবি" },
  { key: "box", label: "[PRODUCT BOX IMAGE]", alt: "প্যাকেজিং বক্সের ছবি" },
] as const;

export default function ProductShowcase() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <h2 className="text-center text-2xl font-extrabold text-slate-900 sm:text-3xl">
          প্রোডাক্ট শোকেস
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-sm text-slate-600 sm:text-base">
          আসল প্রোডাক্ট ছবি যুক্ত হলে এই জায়গাগুলোতে সহজেই প্রতিস্থাপন করা যাবে।
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-5">
          {shots.map((shot) => (
            <ImagePlaceholder
              key={shot.key}
              src={CONFIG.IMAGES[shot.key]}
              alt={`${CONFIG.PRODUCT_NAME} - ${shot.alt}`}
              label={shot.label}
              aspect="aspect-square"
              className="w-full rounded-2xl"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
