import Image from "next/image";
import Link from "next/link";
import { Linkedin } from "lucide-react";

interface MemberCardProps {
  name: string;
  designation: string;
  image: string;
  linkedInProfile?: string | null;
}

export default function MemberCard({
  name,
  designation,
  image,
  linkedInProfile,
}: MemberCardProps) {
  return (
    <div className="group relative w-full max-w-[280px] mx-auto perspective-1000">
      <div className="relative w-[280px] h-[350px] transition-all duration-500 transform group-hover:-translate-y-2">
        {/* Glow Effect */}
        <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl opacity-50 group-hover:opacity-100 blur transition duration-500 group-hover:blur-md" />

        {/* Card Content */}
        <div className="relative w-full h-full bg-black rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
          {/* Image Container */}
          <div className="relative h-[250px] w-full overflow-hidden">
            <Image
              src={image || "/placeholder.svg?height=250"}
              alt={name}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
            />
            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80" />

            {linkedInProfile && (
              <div className="absolute top-4 right-4 z-20 transition-all duration-500 pointer-events-auto">
                <Link
                  href={linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/10 backdrop-blur-md p-2 rounded-full hover:bg-blue-600 hover:text-white text-white/80 transition-colors flex items-center justify-center border border-white/20 shadow-lg"
                >
                  <Linkedin size={20} />
                </Link>
              </div>
            )}
          </div>

          {/* Text Content */}
          <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
            <div className="space-y-1 transform transition-transform duration-300 group-hover:-translate-y-1">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400">
                {name}
              </h2>
              <p className="text-gray-400 text-sm font-medium tracking-wide border-l-2 border-purple-500 pl-2">
                {designation}
              </p>
            </div>

            {/* Animated Bottom Line */}
            <div className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 w-0 group-hover:w-full transition-all duration-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
