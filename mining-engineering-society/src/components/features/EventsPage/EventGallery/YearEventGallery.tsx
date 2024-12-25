import { YearWiseEventsData } from "@/config/Eventspage/EventsPageData";
import Image from "next/image";

export const YearEventGallery = ({ year }: { year: string }) => {
  return (
    <div className="w-full">
      {YearWiseEventsData.filter((items) => items.year === year).map(
        (items) => (
          <div key={items.year}>
            <div className="w-full flex flex-col gap-12">
              {items.events.map((eventsData) => (
                <div
                  key={eventsData.eventName}
                  className="flex flex-col w-full gap-4 sm:gap-8"
                >
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-semibold text-white ">
                    {eventsData.eventName}
                  </div>
                  <div className="flex gap-5 rounded-lg overflow-x-auto w-full">
                    {eventsData.eventImageUrl.map((imageUrl, imageIdx) => (
                      <Image
                        key={imageIdx}
                        src={imageUrl}
                        alt={`Event image `}
                        blurDataURL={imageUrl}
                        width={500}
                        height={4}
                        className="rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
