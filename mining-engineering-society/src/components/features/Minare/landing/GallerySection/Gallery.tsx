import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { GalleryCard } from "./Card";
import { Header } from "../header";
import { useRouter } from "next/navigation";
// import { GalleryCard } from "./components/GalleryCard";

export const Gallery = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-screen   py-20 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-1/2 h-1/2 bg-blue-500/5 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-purple-500/5 blur-[100px] rounded-full" />
      </div>
      <div className="relative space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-center space-y-4">
            <Header label="Gallery" />
            <p className="text-gray-400 max-w-2xl mx-auto px-4">
              Explore the moments that made our events unforgettable
            </p>
          </div>
        </motion.div>

        <GalleryCard />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex z-50  justify-center">
            <button
              onClick={() => router.push("/minare/gallery")}
              className="group  relative inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all duration-300"
            >
              Explore More
              <ChevronRight className="w-4 h-4 transform transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
