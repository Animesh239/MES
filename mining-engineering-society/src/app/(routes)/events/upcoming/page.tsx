import Image from "next/image";
import { getUpcomingEvents } from "@/actions/mes/events/action";
import ComingSoon from "@/components/ui/ComingSoon";

export default async function Home() {
  const response = await getUpcomingEvents();
  const upcomingEvents = response.success && response.data ? response.data : [];

  // If no upcoming events, show coming soon
  if (upcomingEvents.length === 0) {
    return <ComingSoon />;
  }

  // Get the first upcoming event's first image
  const displayImage =
    upcomingEvents[0].imageLinks && upcomingEvents[0].imageLinks.length > 0
      ? upcomingEvents[0].imageLinks[0]
      : "https://res.cloudinary.com/dhv234qct/image/upload/v1742502253/bustzbnvhn6wbdcecsys.jpg";

  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src={displayImage}
        alt="Upcoming Event"
        className="max-h-[85%] max-w-[70%] mt-20"
        width={1920}
        height={1080}
      />
    </div>
  );
}
