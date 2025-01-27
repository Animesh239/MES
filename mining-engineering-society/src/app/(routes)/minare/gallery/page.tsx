// src/app/minare/gallery/page.tsx
import Image from "next/image";

export default function GalleryPage() {
  const galleryImages = [
    {
      src: "/api/placeholder/400/300",
      alt: "Research Lab",
      title: "Advanced Mining Research Lab",
      description: "State-of-the-art research facility",
    },
    // Add more images
  ];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">MINARE Gallery</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {galleryImages.map((image, index) => (
          <div key={index} className="rounded-lg overflow-hidden shadow-lg">
            <Image
              src={image.src}
              alt={image.alt}
              width={400}
              height={300}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold">{image.title}</h3>
              <p className="text-gray-600">{image.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
