"use client";

import { Button } from "@/components/ui/button";
import { submitRegistration } from "@/actions/minare/registration/action";
import { UploadCloud, Loader2 } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

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
  statusText?: string;
}

interface CloudinaryUploadResult {
  event: string;
  info: {
    secure_url: string;
  };
}

interface RegistrationCardProps {
  userId: number;
}

export const RegistrationCard: React.FC<RegistrationCardProps> = ({
  userId,
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

    const uploadOptions: CloudinaryUploadOptions = {
      cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "",
      uploadPreset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET || "",
      sources: ["local", "camera"],
      maxFileSize: 1000000,
      multiple: false,
      resourceType: "image",
      folder: "payment_proofs",
    };

    const uploadWidget = window.cloudinary.createUploadWidget(
      uploadOptions,
      async (error, result) => {
        if (!error && result.event === "success") {
          setImageUrl(result.info.secure_url);
        }

        if (error) {
          console.error("Upload error:", error);
          toast.error("Upload failed: " + (error.message || "Unknown error"));
        }
      }
    );

    uploadWidget.open();
  };

  const handleSubmit = async () => {
    if (!imageUrl) return;

    setIsUploading(true);
    try {
      const result = await submitRegistration(userId, imageUrl);

      if (result.success) {
        toast.success("Minare Registration submitted successfully!");
      } else {
        toast.error(result.error || "Registration failed");
      }
    } catch (error) {
      toast.error("An error occurred during registration");
      console.error(error);
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="w-full max-w-md rounded-lg border border-gray-800 bg-gray-900/50 p-6 shadow-xl backdrop-blur-sm">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          Register for Minare
        </h2>
        <p className="text-gray-400 text-sm">
          Upload payment proof to complete registration
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {imageUrl ? (
          <div className="relative w-full overflow-hidden rounded-lg bg-black/50 p-2 border border-gray-700">
            <Image
              src={imageUrl}
              width={400}
              height={300}
              alt="Payment proof"
              className="w-full h-auto object-contain rounded-md"
            />
            <button
              onClick={() => setImageUrl(null)}
              className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white p-1.5 rounded-full transition-colors"
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
        ) : (
          <div
            onClick={openUploadWidget}
            className="cursor-pointer bg-black/30 hover:bg-black/50 p-8 rounded-xl border-2 border-dashed border-gray-700 hover:border-gray-500 flex flex-col items-center gap-4 transition-all group"
          >
            <UploadCloud className="h-12 w-12 text-gray-400 group-hover:text-white transition-colors" />
            <div className="space-y-1 text-center">
              <p className="text-lg font-medium text-white">
                Click to upload proof
              </p>
              <p className="text-sm text-gray-500">
                Supported formats: PNG, JPG, PDF (Max 1MB)
              </p>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          className="w-full bg-white text-black hover:bg-gray-200"
          disabled={isUploading || (!imageUrl && !isWidgetReady)}
        >
          {isUploading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Submitting...
            </>
          ) : imageUrl ? (
            "Complete Registration"
          ) : (
            "Upload Payment Proof"
          )}
        </Button>
      </div>
    </div>
  );
};
