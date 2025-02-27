import Image from "next/image";

interface CardProp {
  url: string;
  description: string;
  title: string;
}

export const Card = ({ url, description, title }: CardProp) => {
  return (
    <>
      <div className="max-w-[570px] sm:w-[570px] h-[600px] ps-2 xsm:p-4 rounded-lg flex flex-col gap-8 border-[1px] bg-white/[0.02] border-white/[0.3]">
        <div className="relative w-full grayscale hover:grayscale-0 cursor-pointer h-64 transition-all duration-500 ease-in-out">
          <Image
            src={url}
            alt="Minare"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="flex flex-col gap-2 sm:gap-4">
          <div className=" text-white/[0.9] font-bold  text-2xl">{title}</div>
          <div className="text-base sm:text-lg leading-relaxed tracking-wide text-white/[0.7] h-64 text-justify overflow-y-auto">
            {description}
          </div>
        </div>
      </div>
    </>
  );
};
