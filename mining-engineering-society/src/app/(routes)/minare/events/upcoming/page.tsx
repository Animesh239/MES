import Image from "next/image";
import { getUpcomingMinareEvents } from "@/actions/minare/events/action";
import ComingSoon from "@/components/ui/ComingSoon";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function MinareUpcomingEvents() {
  const response = await getUpcomingMinareEvents();
  const upcomingEvents = response.success && response.data ? response.data : [];

  // If no upcoming events, show coming soon
  if (upcomingEvents.length === 0) {
    return <ComingSoon />;
  }

  const event = upcomingEvents[0];
  const displayImage =
    event.imageLinks && event.imageLinks.length > 0
      ? event.imageLinks[0]
      : "https://res.cloudinary.com/dhv234qct/image/upload/v1742502253/bustzbnvhn6wbdcecsys.jpg";

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 pt-24 bg-gradient-to-b from-black/0 via-black/5 to-black/0">
      <div className="max-w-4xl w-full flex flex-col items-center space-y-8">
        
        {/* Title Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white via-white/90 to-white/70 tracking-tight">
            {event.title}
          </h1>
          <div className="h-1 w-24 mx-auto bg-gradient-to-r from-blue-500 to-purple-600 rounded-full" />
        </div>

        {/* Image Card */}
        <div className="relative group w-full max-w-2xl aspect-video rounded-3xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Image
            src={displayImage}
            alt={event.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            priority
          />
          
          {/* Optional: Add badge or extra info overlay if needed */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium">
              Upcoming
            </span>
          </div>
        </div>

      </div>
    </div>
  );
}
