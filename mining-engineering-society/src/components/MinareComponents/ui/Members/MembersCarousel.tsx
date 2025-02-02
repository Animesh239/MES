"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/MinareComponents/ui/Members/Carousel";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import MemberCard from "./MembersCard";

interface Member {
  id: number;
  name: string;
  designation: string;
  image: string;
}

interface MembersCarouselProps {
  members: Member[];
}

interface ApiType {
  selectedScrollSnap: () => number;
  scrollNext: () => void;
  on: (event: string, callback: () => void) => void;
}

export default function MembersCarousel({ members }: MembersCarouselProps) {
  const [api, setApi] = useState<ApiType | null>(null);
  const [current, setCurrent] = useState(0);
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (!api) {
      return;
    }

    console.log("API initialized:", api);

    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  useEffect(() => {
    const autoPlay = setInterval(() => {
      if (api) {
        api.scrollNext();
      }
    }, 6000);

    return () => clearInterval(autoPlay);
  }, [api]);

  return (
    <div ref={parent} className="w-full">
      <Carousel
        setApi={(api) => {
          console.log("Setting API:", api);
          setApi(api as ApiType);
        }}
        className="w-full max-w-full mx-auto mt-10 sm:mt-24"
      >
        <CarouselContent>
          {members.map((member) => (
            <CarouselItem key={member.id} className="pl-4">
              <div className="p-1">
                <MemberCard {...member} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="py-4 text-center text-md text-muted-foreground">
        Member {current} of {members.length}
      </div>
    </div>
  );
}
