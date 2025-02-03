import Image from "next/image";

interface MemberCardProps {
  name: string;
  designation: string;
  image: string;
}

export default function MemberCard({
  name,
  designation,
  image,
}: MemberCardProps) {
  return (
    <div className="w-full max-w-[270px] mx-auto">
      <div className="relative rounded-xl overflow-hidden shadow-lg border-4 border-white transition-all duration-300 hover:shadow-[0_0_15px_5px_rgba(255,255,255,0.5)] hover:scale-105">
        <div className="relative">
          <Image
            src={image || "/placeholder.svg?height=200"}
            alt={name}
            width={300}
            height={240}
            className="w-[300px] h-[300px] object-cover"
          />
          <div className="p-2 text-center bg-black">
            <h2 className="text-2xl font-bold mb-1 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              {name}
            </h2>
            <p className="text-md bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {designation}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
