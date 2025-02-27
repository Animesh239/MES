import { Button } from "@/components/ui/button";
import { signInWithGoogle } from "@/lib/firebase/signinwithgoogle";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const LoginWithGoogle = ({
  onGoogleButtonClick
}: {
  onGoogleButtonClick: () => void;
}) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const user = await signInWithGoogle();
      // console.log(user);
      // console.log(user);
      // if (user.isAdmin) {
      //   router.push("/admin");
      // }
      // if (user.isVerify && !user.isAdmin) {
      //   router.push("/user");
      // }
      if (user?.userExists) {
        router.push("/minare/");
      } else onGoogleButtonClick();
    } catch (error) {
      console.error("Google Login Error:", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="text-center">
        <Button
          variant="default"
          onClick={() => handleGoogleLogin()}
          disabled={loading}
          className="w-full h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
        >
          <Image
            src="https://res.cloudinary.com/dehegwbs0/image/upload/v1739384661/dpf22a4bqu4f3ftdrypa.png"
            alt="google logo"
            width={26}
            height={26}
          />
          {loading ? "logging..." : "Continue with Google"}
        </Button>
      </div>
    </div>
  );
};
