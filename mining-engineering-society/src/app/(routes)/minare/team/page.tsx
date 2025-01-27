// src/app/minare/team/page.tsx
import Image from "next/image";

export default function TeamPage() {
  const teamMembers = [
    {
      name: "John Doe",
      role: "Director",
      image: "/api/placeholder/150/150",
      bio: "10+ years in mining research",
    },
    // Add more team members
  ];

  return (
    <div className="container mx-auto py-16">
      <h1 className="text-4xl font-bold text-center mb-12">Our Team</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div
            key={index}
            className="text-center p-6 hover:shadow-lg transition-shadow"
          >
            <Image
              src={member.image}
              alt={member.name}
              width={150}
              height={150}
              className="rounded-full mx-auto mb-4"
            />
            <h3 className="text-xl font-semibold">{member.name}</h3>
            <p className="text-gray-600 mb-2">{member.role}</p>
            <p className="text-sm text-gray-500">{member.bio}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
