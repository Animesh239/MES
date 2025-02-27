import {
  MiningDeptDescription,
  MiningDeptImgUrl
} from "@/config/Homepage/HomePagedata";
import Image from "next/image";

export const AboutMiningDept = () => {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row  md:justify-center md:items-center  rounded-lg py-3 sm:py-5 px-2 xsm:px-4 sm:px-6 md:px-10 bg-white/[0.05] gap-4 md:gap-5 border-[1px] border-white/[0.8] ">
        <div className="flex flex-col gap-2 sm:gap-4 leading-relaxed tracking-wide w-full md:w-1/2 lg:w-3/5 h-[40vh] md:h-[55vh]">
          <div className=" text-white/[0.9] font-bold text-2xl sm:text-3xl md:text-4xl">
            About Our Department
          </div>
          <div className="text-base xsm:text-lg sm:text-xl md:text-2xl text-justify text-white/[0.7] overflow-y-auto">
            {MiningDeptDescription}
          </div>
        </div>
        <div className="relative w-full grayscale hover:grayscale-0 cursor-pointer md:w-1/2 lg::w-2/5 h-[30vh] sm:h-[40vh] md:h-[60vh] transition-all duration-500 ease-in-out ">
          <Image
            src={MiningDeptImgUrl}
            alt="Minare"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
      </div>
    </>
  );
};
