import Image from "next/image";

interface CardProp {
  url: string;
  description: string;
}

export const Card = ({ url, description }: CardProp) => {
  return (
    <>
      <div className="max-w-[570px] h-[600px] p-5 rounded-lg flex flex-col gap-8 border-[1px] border-white/[0.3]">
        <div className="relative w-full  h-64">
          <Image
            src={url}
            alt="Minare"
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <div className="text-lg leading-relaxed tracking-wide text-white/[0.7] h-64 overflow-y-auto">
          {description}
        </div>
      </div>
    </>
  );
};
