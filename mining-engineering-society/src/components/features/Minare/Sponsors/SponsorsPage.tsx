import Image from "next/image";
import { sponsorshipData } from "@/config/Minare/Sponsors/Data";

export default function Sponsorship() {
  const {
    title,
    description,
    whySponsorImage,
    pastSponsorsImage,
    bankDetails,
  } = sponsorshipData;

  return (
    <div className="bg-black text-white min-h-screen mt-32 px-4 lg:px-24">
      <div className="text-center mb-16">
        <div className=" text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent sm:mb-12">
          {title}
        </div>
        <p className="mt-8 text-md lg:text-2xl mx-auto">{description}</p>
      </div>

      <div className="my-8">
        <Image
          src={whySponsorImage || "/placeholder.svg"}
          alt="Why Sponsor table"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <div className="my-8">
        <Image
          src={pastSponsorsImage || "/placeholder.svg"}
          alt="Past sponsors"
          width={1200}
          height={600}
          className="w-full h-auto"
        />
      </div>

      <div className="my-8">
        <Image
          src={bankDetails || "/placeholder.svg"}
          alt="Past sponsors"
          width={1200}
          height={500}
          className="w-full h-auto"
        />
      </div>

      {/* <div className="flex justify-center mt-12 mb-12">
        <div className="border-2 border-white rounded-lg p-6 max-w-md w-full bg-gray-900 shadow-lg">
          <h2 className="text-2xl lg:text-3xl font-semibold mb-6 text-center underline">
            Bank Details
          </h2>
          <div className="space-y-4">
            <div className="flex flex-col">
              <span className="text-gray-400">A/c. Name</span>
              <span className="font-semibold">{bankDetails.accountName}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">A/c. Number</span>
              <span className="font-semibold">{bankDetails.accountNumber}</span>
            </div>
            <div className="flex flex-col">
              <span className="text-gray-400">IFSC Code</span>
              <span className="font-semibold">{bankDetails.ifscCode}</span>
            </div>
          </div>
        </div>
      </div> */}
    </div>
  );
}
