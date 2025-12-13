import { Card, CardHeader, CardBody, Image } from "@nextui-org/react";
import Link from "next/link";

export default function CarouselCard({
  name,
  position,
  imgURL,
  tenure,
  linkedInProfile,
}: MemberCardProps) {
  return (
    <div className="p-[2px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl ml-4 sm:ml-6 md:ml-8 h-[320px] sm:h-[380px]">
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
                wrapper:
                  "w-[140px] h-[140px] xsm:w-[160px] xsm:h-[160px] sm:w-[180px] sm:h-[180px]",
              }}
            />
          </div>
          <CardHeader className="pb-0 pt-3 sm:pt-4 px-0 flex-col text-white text-center mt-auto">
            <p className="text-xl sm:text-2xl uppercase font-bold line-clamp-2">
              {name}
            </p>
            <h4 className="font-bold text-base sm:text-large text-gray-400 line-clamp-1">
              {position}
            </h4>
            <h4 className="font-bold text-sm sm:text-base text-gray-400 line-clamp-1">
              {tenure}
            </h4>
            {linkedInProfile && (
              <div className="pt-2 flex justify-center">
                <Link
                  href={linkedInProfile}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 px-2 py-1 bg-blue-600/20 hover:bg-blue-600/30 border border-blue-500/30 hover:border-blue-500/50 rounded-lg text-blue-300 hover:text-blue-200 text-xs font-medium transition-all duration-300 hover:scale-105"
                  onClick={(e) => e.stopPropagation()}
                >
                  <svg
                    className="w-3 h-3"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  LinkedIn
                </Link>
              </div>
            )}
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
  linkedInProfile?: string | null;
}
