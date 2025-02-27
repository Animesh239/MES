import { Button } from "@/components/ui/button";
import { UpdateData } from "@/lib/firebase/updateData";
import { UploadCloud } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";

declare global {
  interface Window {
    cloudinary?: CloudinaryUploadWidget;
  }
}

interface CloudinaryUploadWidget {
  createUploadWidget: (
    options: CloudinaryUploadOptions,
    callback: (
      error: CloudinaryUploadError | null,
      result: CloudinaryUploadResult
    ) => void
  ) => { open: () => void };
}

interface CloudinaryUploadOptions {
  cloudName: string;
  uploadPreset: string;
  sources: string[];
  maxFileSize: number;
  multiple: boolean;
  resourceType: string;
  folder: string;
  styles?: Record<string, unknown>;
}

interface CloudinaryUploadError {
  message: string;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
  };
}

interface PaymentProofProps {
  onPaymentProofUploadButtonClick: (imageUrl?: string) => void;
}

export const PaymentProof: React.FC<PaymentProofProps> = ({
  onPaymentProofUploadButtonClick
}) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isWidgetReady, setIsWidgetReady] = useState<boolean>(false);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  useEffect(() => {
    if (!window.cloudinary) {
      const script = document.createElement("script");
      script.src = "https://upload-widget.cloudinary.com/global/all.js";
      script.async = true;
      script.onload = () => setIsWidgetReady(true);
      document.body.appendChild(script);
    } else {
      setIsWidgetReady(true);
    }

    return () => {
      const scriptElement = document.querySelector(
        'script[src="https://upload-widget.cloudinary.com/global/all.js"]'
      );
      if (scriptElement && scriptElement.parentNode) {
        scriptElement.parentNode.removeChild(scriptElement);
      }
    };
  }, []);

  const openUploadWidget = () => {
    if (!isWidgetReady || !window.cloudinary) return;

    setIsUploading(true);

    const uploadOptions: CloudinaryUploadOptions = {
      cloudName: `${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}`,
      uploadPreset: `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
      sources: ["local", "camera"],
      maxFileSize: 5000000,
      multiple: false,
      resourceType: "image",
      folder: "payment_proofs",
      styles: {
        palette: {
          window: "rgba(0, 0, 0, 0.9)",
          sourceBg: "rgba(0, 0, 0, 0.85)",
          windowBorder: "rgba(255, 255, 255, 0.8)",
          tabIcon: "rgba(255, 255, 255, 0.9)",
          inactiveTabIcon: "rgba(192, 192, 192, 0.6)",
          menuIcons: "rgba(255, 255, 255, 0.9)",
          link: "rgba(255, 255, 255, 0.8)",
          action: "rgba(255, 255, 255, 0.85)",
          inProgress: "rgba(200, 200, 200, 0.7)",
          complete: "rgba(255, 255, 255, 0.9)",
          error: "rgba(255, 0, 0, 0.8)",
          textDark: "rgba(255, 255, 255, 0.95)",
          textLight: "rgba(0, 0, 0, 0.8)"
        },

        fonts: {
          "'Roboto', sans-serif": {
            url: "https://fonts.googleapis.com/css?family=Roboto",
            active: true
          }
        }
      }
    };

    const uploadWidget = window.cloudinary.createUploadWidget(
      uploadOptions,
      async (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
          setIsUploading(false);
        }

        if (error) {
          console.error("Upload error:", error.message);
          setIsUploading(false);
        }

        if (result.event === "close") {
          setIsUploading(false);
        }
      }
    );

    uploadWidget.open();
  };

  const handleComplete = async () => {
    if (imageUrl) {
      setIsUploading(true);
      const reqdResult = await UpdateData({
        paymentProofImgURL: imageUrl,
        profileSubmitted: true
      });

      if (reqdResult) setIsUploading(false);
      onPaymentProofUploadButtonClick(imageUrl);
    } else {
      openUploadWidget();
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Upload Payment Proof
        </h2>

        {imageUrl ? (
          <div className="mb-4">
            <div className="relative w-full overflow-hidden rounded-lg bg-white/10 p-4">
              <Image
                src={imageUrl}
                width={20}
                height={20}
                alt="Payment proof"
                className="w-full h-auto max-h-64 object-contain rounded-lg"
              />
              <button
                onClick={() => setImageUrl(null)}
                className="absolute top-2 right-2 bg-red-500/80 text-white p-1 rounded-full hover:bg-red-500 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div
            onClick={openUploadWidget}
            className="cursor-pointer bg-white/10 hover:bg-white/20 p-8 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center gap-4 transition-all"
          >
            <UploadCloud className="h-12 w-12 text-gray-400" />
            <div className="space-y-1">
              <p className="text-lg font-medium text-white">
                Click to upload file
              </p>
              <p className="text-sm text-gray-400">
                PNG, JPG, or PDF (MAX 5MB)
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleComplete}
          className="w-full mt-7 h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
          disabled={isUploading || (!imageUrl && !isWidgetReady)}
        >
          {isUploading
            ? "Uploading..."
            : imageUrl
            ? "Complete Registration"
            : "Upload Payment Proof"}
        </Button>
      </div>
    </div>
  );
};
