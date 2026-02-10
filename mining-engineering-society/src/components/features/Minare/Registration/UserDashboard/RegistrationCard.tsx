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
  const [isModalOpen, setIsModalOpen] = useState(false);

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

  const handleUploadClick = () => {
    setIsModalOpen(true);
  };

  const handleProceed = () => {
    setIsModalOpen(false);
    openUploadWidget();
  };

  return (
    <>
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
              onClick={handleUploadClick}
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
            onClick={imageUrl ? handleSubmit : handleUploadClick}
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

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex justify-center items-center p-4">
          <div className="bg-gray-900 rounded-2xl border border-gray-700 w-full max-w-lg overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-gray-800">
              <h3 className="text-xl font-bold text-white">
                Important Information
              </h3>
            </div>
            <div className="p-6 space-y-4">
              <p className="text-gray-300">
                Please acknowledge the following before proceeding:
              </p>
              <div className="space-y-3 bg-black/30 p-4 rounded-lg border border-gray-800">
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500/20 rounded-full text-blue-400">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">
                      Accommodation:
                    </span>{" "}
                    Provided from 6th to 8th March.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500/20 rounded-full text-blue-400">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Kit:</span>{" "}
                    Registration kit will be provided.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-red-500/20 rounded-full text-red-400">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Food:</span>{" "}
                    Fooding will NOT be provided.
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 p-1 bg-blue-500/20 rounded-full text-blue-400">
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={3}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-300">
                    <span className="text-white font-medium">Events:</span> Free
                    access to all events.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-6 border-t border-gray-800 flex justify-end gap-3 bg-black/20">
              <Button
                variant="ghost"
                onClick={() => setIsModalOpen(false)}
                className="text-gray-400 hover:text-white hover:bg-white/10"
              >
                Cancel
              </Button>
              <Button
                onClick={handleProceed}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                I Understand, Proceed
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
