import { MinareEventsGalleryPage } from "@/components/features/Minare/EventsPage/MinareEventsGalleryPage";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function MinarePastEvents() {
  return (
    <>
      <MinareEventsGalleryPage />
    </>
  );
}
