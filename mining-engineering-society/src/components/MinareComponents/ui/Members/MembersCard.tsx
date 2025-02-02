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
    <div className="group aspect-[5/6] w-full max-w-[270px] mx-auto [perspective:1000px]">
      <div className="relative h-full w-full rounded-xl shadow-xl transition-all duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        <div className="absolute inset-0">
          <Image
            src={image || "/placeholder.svg?height=300&width=250"}
            alt={name}
            fill
            className="rounded-xl object-cover shadow-xl shadow-black/40"
          />
        </div>
        <div className="absolute inset-0 h-full w-full rounded-xl bg-black px-6 text-center [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-hidden transition-all duration-500 group-hover:border-2 group-hover:border-white group-hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.5)]">
          <div className="flex min-h-full flex-col items-center justify-center relative z-10">
            <h2 className="text-2xl font-bold mb-2 bg-gradient-to-r from-purple-500 to-blue-600 bg-clip-text text-transparent">
              {name}
            </h2>
            <p className="text-lg bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              {designation}
            </p>
          </div>
          <div className="starry-bg absolute inset-0 opacity-50"></div>
        </div>
      </div>
    </div>
  );
}
