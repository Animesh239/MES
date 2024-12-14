import Image from "next/image";

export const AboutMiningDept = () => {
  return (
    <>
      <div className="flex flex-col-reverse md:flex-row  md:justify-center md:items-center  rounded-lg py-3 sm:py-5 px-2 xsm:px-4 sm:px-6 md:px-10 bg-white/[0.05] gap-4 md:gap-5 border-[1px] border-white/[0.8] ">
        <div className="flex flex-col gap-2 sm:gap-4 leading-relaxed tracking-wide   w-full md:w-1/2 lg:w-3/5 h-[40vh] md:h-[55vh]">
          <div className=" text-white/[0.9] font-bold text-2xl sm:text-3xl md:text-4xl">
            About Mining Department
          </div>
          <div className="text-base xsm:text-lg sm:text-xl md:text-2xl  text-white/[0.7] overflow-y-auto">
            The Department of Mining Engineering at NIT Rourkela, established in
            1979 in the coal and mineral belt, aims to lead eco-friendly mineral
            resource utilization and serve as a top choice for undergraduate and
            graduate studies. It specializes in areas like Mining Technology,
            Geomechanics, Mine Environment, Clean Coal Technology, GIS in
            Mining, Mine Planning, and Surveying, supported by modern equipment
            and advanced mining software. Faculty members contribute to national
            and international mining policies and technical evaluations. The
            Department conducts training for professionals and emphasizes
            all-round student development through mine visits, expert talks,
            industry projects, and technical activities.
          </div>
        </div>
        <div className="relative w-full md:w-1/2 lg::w-2/5 h-[30vh] sm:h-[40vh] md:h-[60vh]  ">
          <Image
            src="https://res.cloudinary.com/dehegwbs0/image/upload/v1734127534/k0i3zjaupoz2cuj8nboc.png"
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
