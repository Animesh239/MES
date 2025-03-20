import Image from "next/image";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Image
        src="https://res.cloudinary.com/dhv234qct/image/upload/v1742502253/bustzbnvhn6wbdcecsys.jpg"
        alt="Image"
        className="max-h-[85%] max-w-[70%] mt-20
        "
        width={1920}
        height={1080}
      />
    </div>
  );
}
