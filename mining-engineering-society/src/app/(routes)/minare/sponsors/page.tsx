// src/app/minare/sponsors/page.tsx
import Image from "next/image";

export default function SponsorsPage() {
  const sponsors = [
    {
      name: "Mining Corp",
      tier: "Platinum",
      logo: "/api/placeholder/200/100",
      description: "Leading mining technology provider",
    },
    // Add more sponsors
  ];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Sponsors</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {sponsors.map((sponsor, index) => (
          <div
            key={index}
            className="text-center p-6 border rounded-lg hover:shadow-xl transition-shadow"
          >
            <Image
              src={sponsor.logo}
              alt={sponsor.name}
              width={200}
              height={100}
              className="mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{sponsor.name}</h3>
            <p className="text-gray-600 mb-2">{sponsor.tier} Sponsor</p>
            <p className="text-sm text-gray-500">{sponsor.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
