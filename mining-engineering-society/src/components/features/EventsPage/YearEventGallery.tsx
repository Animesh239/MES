import { YearWiseEventsData } from "@/config/Eventspage/EventsPageData";
import Image from "next/image";

export const YearEventGallery = ({ year }: { year: string }) => {
  return (
    <div className="w-full">
      {YearWiseEventsData.map((items, index) => (
        <div key={index}>
          {items.year === year && (
            <div className="w-full">
              {items.events.map((eventsData, idx) => (
                <div key={idx} className="flex flex-col w-full mb-12">
                  <div className="text-6xl font-semibold text-white mb-8">
                    {eventsData.eventName}
                  </div>
                  <div className="flex gap-5 rounded-lg overflow-x-auto w-full">
                    {eventsData.eventImageUrl.map((imageUrl, idx) => (
                      <Image
                        key={idx}
                        src={imageUrl}
                        alt={`Event image ${idx + 1}`}
                        width={500}
                        height={400}
                        className="cursor-pointer rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
