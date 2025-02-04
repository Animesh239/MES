"use client";
import { Button } from "@/components/ui/button";
import { Header } from "../header";
import { GalleryCard } from "./Card";
import { useRouter } from "next/navigation";

export const Gallery = () => {
  const router = useRouter();
  return (
    <div className="md:h-screen h-auto flex flex-col pb-20 gap-20">
      <Header label="Gallery" />
      <GalleryCard />
      <div className="flex justify-center items-center">
        <Button
          variant="default"
          onClick={() => {
            router.push("/minare/gallery");
          }}
          className="font-semibold cursor-pointer"
        >
          Explore More
        </Button>
      </div>
    </div>
  );
};
