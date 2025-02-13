"use client";
import { useEffect, useState } from "react";
import { RegistrationForm } from "./Form/form";
import { CheckCircle2 } from "lucide-react";
// import { UserFormInterface } from "@/config/Registration/type";
// import { Button } from "@/components/ui/button";
import { PaymentDeatails } from "./PaymentDetails/Details";
import { PaymentProof } from "./PaymentProof/proof";
import { LoginWithGoogle } from "./GoogleLogin/google";
import { useRouter } from "next/navigation";

const steps = [
  { id: 1, name: "Google Login", status: "complete" },
  { id: 2, name: "Registration Form", status: "current" },
  { id: 3, name: "Payment details", status: "current" },
  { id: 4, name: "upload Payment Proof", status: "upcoming" }
];

export const RegistrationPage = () => {
  const [currentStep, setCurrentStep] = useState(1);
  // const [formData, setFormData] = useState({});
  const router = useRouter();

  useEffect(() => {
    const createStars = () => {
      const container = document.querySelector(".star-container");
      if (!container) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div");
        star.className = "absolute bg-white rounded-full animate-twinkle";
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.width = `${Math.random() * 3}px`;
        star.style.height = star.style.width;
        star.style.animationDelay = `${Math.random() * 2}s`;
        container.appendChild(star);
      }
    };

    createStars();
  }, []);

  const handleStepStateChange = () => {
    if (currentStep === 4) {
      router.push("/minare/");
      setCurrentStep(1);
    }
    setCurrentStep(currentStep + 1);
  };

  return (
    <div className="h-auto p-4 relative flex flex-col gap-32">
      <div className="star-container fixed inset-0 -z-10 overflow-hidden"></div>
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
        <div className="w-full max-w-2xl relative">
          <div className="relative bg-white/5 backdrop-blur-xl p-8 md:p-12 rounded-2xl shadow-xl border border-white/10">
            <div className="mb-12">
              <div className="flex justify-center">
                <div className="flex items-center w-full max-w-lg">
                  {steps.map((step, index) => (
                    <div key={step.id} className="flex items-center w-full">
                      <div
                        className={`relative h-8 w-8 rounded-full flex items-center justify-center ${
                          currentStep >= step.id ? "bg-gray-200" : "bg-gray-700"
                        }`}
                      >
                        {currentStep > step.id ? (
                          <CheckCircle2 className="h-5 w-5 text-gray-900" />
                        ) : (
                          <span className="h-4 w-4 bg-white rounded-full" />
                        )}
                      </div>
                      {index < steps.length - 1 && (
                        <div
                          className={`flex-1 h-1 ${
                            currentStep > step.id
                              ? "bg-gray-200"
                              : "bg-gray-700"
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 flex justify-between text-sm font-medium text-gray-300">
                {steps.map((step) => (
                  <div key={step.id}>{step.name}</div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              {currentStep === 1 && (
                <LoginWithGoogle onGoogleButtonClick={handleStepStateChange} />
              )}

              {currentStep === 2 && (
                <RegistrationForm
                  onFormSubmitButtonClick={handleStepStateChange}
                />
              )}
              {currentStep === 3 && (
                <PaymentDeatails
                  onPaymentDoneButtonClick={handleStepStateChange}
                />
              )}

              {currentStep === 4 && (
                <PaymentProof
                  onPaymentProofUploadButtonClick={handleStepStateChange}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
