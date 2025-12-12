import { EventsGalleryPage } from "@/components/features/EventsPage/EventGallery/EventsGalleryPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

const Events = () => {
  return (
    <>
      <EventsGalleryPage />
    </>
  );
};

export default Events;
