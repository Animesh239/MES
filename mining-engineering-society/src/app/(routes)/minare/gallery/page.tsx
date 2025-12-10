import Gallery from "@/components/features/Minare/Gallery/Gallery";
import { getAllGalleryImages } from "@/actions/minare/gallery/action";

export default async function GalleryPage() {
  const response = await getAllGalleryImages();
  const uploadedImages = response.success && response.data ? response.data : [];

  return <Gallery uploadedImages={uploadedImages} />;
}
