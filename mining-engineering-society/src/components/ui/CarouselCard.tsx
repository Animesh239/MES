import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";

export default function CarouselCard({
  name,
  position,
  imgURL,
  tenure,
}: MemberCardProps) {
  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl ml-4 sm:ml-6 md:ml-8 h-[320px] sm:h-[350px]">
      <Card className="py-3 sm:py-4 px-2 sm:px-3 bg-black border-none w-[200px] xsm:w-[230px] sm:w-[260px] md:w-[280px] rounded-2xl h-full">
        <CardBody className="overflow-visible py-2 flex flex-col h-full">
          <div className="flex-shrink-0 flex justify-center">
            <Image
              alt="Card background"
              className="object-cover rounded-full opacity-100"
              src={imgURL}
              width={160}
              height={160}
              classNames={{
                wrapper: "w-[140px] h-[140px] xsm:w-[160px] xsm:h-[160px] sm:w-[180px] sm:h-[180px]"
              }}
            />
          </div>
          <CardHeader className="pb-0 pt-3 sm:pt-4 px-0 flex-col text-white text-center mt-auto">
            <p className="text-xl sm:text-2xl uppercase font-bold line-clamp-2">{name}</p>
            <h4 className="font-bold text-base sm:text-large text-gray-400 line-clamp-1">{position}</h4>
            <h4 className="font-bold text-sm sm:text-base text-gray-400 line-clamp-1">{tenure}</h4>
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
