import { Card, CardBody, Image } from "@nextui-org/react";

export default function MemberCard({
  name,
  position,
  imgURL,
}: MemberCardProps) {
  return (
    <div className="relative w-[300px] h-[400px] transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <Card
        className="py-4 px-3 bg-black border-2 border-transparent bg-clip-padding rounded-2xl h-full flex flex-col"
        style={{
          backgroundImage:
            "linear-gradient(black, black), linear-gradient(to right, #60a5fa, #a78bfa)",
          backgroundOrigin: "border-box",
          backgroundClip: "padding-box, border-box",
        }}
      >
        <CardBody className="py-2 flex flex-col h-full">
          <div className="flex-1 flex items-center justify-center">
            <Image
              alt={`${name}'s photo`}
              className="object-cover rounded-full opacity-100"
              src={imgURL}
              width={220}
              height={220}
            />
          </div>
          <div className="mt-4 text-center">
            <p className="text-2xl uppercase font-bold text-white break-words">
              {name}
            </p>
            <p className="font-bold text-large text-gray-400 mt-1">
              {position}
            </p>
          </div>
        </CardBody>
      </Card>
    </div>
  );
}

interface MemberCardProps {
  name: string;
  position: string;
  imgURL: string;
}
