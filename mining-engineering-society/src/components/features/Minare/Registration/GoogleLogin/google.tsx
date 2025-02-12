import { Button } from "@/components/ui/button";
import Image from "next/image";

export const LoginWithGoogle = ({
  onGoogleButtonClick
}: {
  onGoogleButtonClick: () => void;
}) => {
  const handleGoogleLogin = () => {
    onGoogleButtonClick();
  };
  return (
    <div>
      <div className="text-center">
        <Button
          variant="default"
          onClick={() => handleGoogleLogin()}
          className="w-full h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
        >
          <Image
            src="https://res.cloudinary.com/dehegwbs0/image/upload/v1739384661/dpf22a4bqu4f3ftdrypa.png"
            alt="google logo"
            width={26}
            height={26}
          />
          Continue with Google
        </Button>
      </div>
    </div>
  );
};
