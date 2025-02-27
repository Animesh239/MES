"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
// import { useForm } from "react-hook-form";
import { z } from "zod";
// import { LoginModal } from "./LoginModal";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { signInWithGoogle } from "@/lib/firebase/signinwithgoogle";
import { useForm } from "react-hook-form";

import { useState } from "react";
import { generateZodSchema } from "@/config/Minare/Registration/RegistrationFormSchema";
import { RegistrationFormData } from "@/config/Minare/Registration/RegistrationFormData";
import { UserFormInterface } from "@/config/Minare/Registration/type";
import { UpdateData } from "@/lib/firebase/updateData";
// import { signInWithEmail } from "@/lib/firebase/signinwithemail";

export const RegistrationForm = ({
  onFormSubmitButtonClick
}: {
  onFormSubmitButtonClick: () => void;
}) => {
  let FormData: UserFormInterface = {
    fullname: "",
    phonenumber: "",
    collegename: "",
    branch: "",
    graduationyear: ""
  };
  const [loading, setLoading] = useState(false);
  const schema = generateZodSchema(RegistrationFormData);
  //   const [isModalOpen, setIsModalOpen] = useState(false);
  //   const router = useRouter();

  //   const handleModalClose = () => setIsModalOpen(false);

  const defaultValues = RegistrationFormData.reduce(
    (acc, field) => ({
      ...acc,
      [field.id]: field.type === "dropdown" ? "" : ""
    }),
    {}
  );

  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues
  });

  const onSubmit = async (data: z.infer<typeof schema>) => {
    console.log(data);
    setLoading(!loading);
    FormData = {
      fullname: data.fullname,
      phonenumber: data.phonenumber,
      collegename: data.collegename,
      graduationyear: data.graduationyear,
      branch: data.branch
    };
    // console.log("yy", FormData);
    const result = await UpdateData(FormData);
    if (result) setLoading(!loading);

    onFormSubmitButtonClick();

    //     try {
    //       setLoading(true);
    //       const user = await signInWithEmail(data.email, data.password);
    //       // console.log(user);

    //       if (user.isAdmin) {
    //         router.push("/admin");
    //       } else if (user.isVerify) {
    //         router.push("/user");
    //       }
    //     } catch (error) {
    //       console.error("Email Login Error:", error);
    //     } finally {
    //       setLoading(false);
    //     }
    //   };
  };

  //   const handleGoogleLogin = async () => {
  //     try {
  //       setLoading(true);
  //       const user = await signInWithGoogle();
  //       // console.log(user);
  //       if (user.isAdmin) {
  //         router.push("/admin");
  //       }
  //       if (user.isVerify && !user.isAdmin) {
  //         router.push("/user");
  //       }
  //     } catch (error) {
  //       console.error("Google Login Error:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  return (
    <Form {...form}>
      <form
        className="space-y-4 sm:space-y-6"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        {RegistrationFormData.map((data, index) => {
          if (["text"].includes(data.type)) {
            return (
              <FormField
                key={index}
                control={form.control}
                name={data.id}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-xs sm:text-[13px] font-medium text-white/70 mb-1.5 block">
                      {data.label.toUpperCase()}
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="h-10 sm:h-12 bg-white/[0.04] border-white/[0.08] text-white placeholder:text-white/30 focus:border-white/20 focus:ring-white/10 rounded-lg transition-all duration-200 text-sm sm:text-base"
                        type={data.type}
                        placeholder={data.placeholder}
                        {...field}
                        value={field.value ?? ""}
                      />
                    </FormControl>
                    <FormMessage className="text-red-300/90 text-xs sm:text-sm mt-1.5" />
                  </FormItem>
                )}
              />
            );
          }
          return null;
        })}

        <div className="space-y-3 sm:space-y-4 pt-2">
          <Button
            type="submit"
            className="w-full h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
            disabled={loading}
          >
            {loading ? "submitting..." : "submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
};
