import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function MemberCard({
  name,
  position,
  imgURL,
}: MemberCardProps) {
  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
      <Card className="py-4 px-3 bg-black border-none max-w-[400px] rounded-2xl ">
        <CardBody className="overflow-visible py-2 justify-center items-center">
          <Image
            alt="Card background"
            className="object-cover rounded-full opacity-100"
            src={imgURL}
            width={250}
            height={250}
          />
          <CardHeader className="pb-0 pt-4 px-4 flex-col text-white text-center">
            <p className="text-2xl uppercase font-bold">{name}</p>
            <h4 className="font-bold text-large text-gray-400">{position}</h4>
          </CardHeader>
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
