"use client";

import { useState } from "react";
import { uploadIdCard } from "@/actions/minare/registration/action";
import { CldUploadButton } from "next-cloudinary";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IdCardUploadProps {
  userId: number;
}

export function IdCardUpload({ userId }: IdCardUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const router = useRouter();

  const handleUploadSuccess = async (result: any) => {
    if (result.info && result.info.secure_url) {
      setIsUploading(true);
      try {
        const response = await uploadIdCard(userId, result.info.secure_url);
        if (response.success) {
          toast.success("ID Card uploaded successfully!");
          router.refresh();
        } else {
          toast.error("Failed to save ID Card.");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <CldUploadButton
        uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
        onSuccess={handleUploadSuccess}
        className={`w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors flex items-center justify-center h-10 ${
          isUploading ? "opacity-50 cursor-not-allowed pointer-events-none" : ""
        }`}
      >
        {isUploading ? "Saving..." : "Upload ID Card"}
      </CldUploadButton>
    </div>
  );
}
