import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function CarouselCard({
  name,
  position,
  imgURL,
  tenure,
}: MemberCardProps) {
  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl ml-8 h-[350px]">
      <Card className="py-4 px-3 bg-black border-none max-w-[230px] xsm:max-w-[280px] rounded-2xl h-full">
        <CardBody className="overflow-visible py-2 flex flex-col h-full">
          <div className="flex-shrink-0 flex justify-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full opacity-100"
              src={imgURL}
              width={180}
              height={180}
            />
          </div>
          <CardHeader className="pb-0 pt-4 px-0 flex-col text-white text-center mt-auto">
            <p className="text-2xl uppercase font-bold">{name}</p>
            <h4 className="font-bold text-large text-gray-400">{position}</h4>
            <h4 className="font-bold text-large text-gray-400">{tenure}</h4>
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
  tenure: string;
}
