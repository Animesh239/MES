import { Button } from "@/components/ui/button";
import { UploadCloud } from "lucide-react";
import { useState } from "react";

export const PaymentProof = ({
  onPaymentProofUploadButtonClick
}: {
  onPaymentProofUploadButtonClick: () => void;
}) => {
  const [file, setFile] = useState<File | null>(null);
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-6">
          Upload Payment Proof
        </h2>
        <label className="cursor-pointer bg-white/10 hover:bg-white/20 p-8 rounded-xl border-2 border-dashed border-white/20 flex flex-col items-center gap-4 transition-all">
          <UploadCloud className="h-12 w-12 text-gray-400" />
          <div className="space-y-1">
            <p className="text-lg font-medium text-white">
              Click to upload file
            </p>
            <p className="text-sm text-gray-400">PNG, JPG, or PDF (MAX 5MB)</p>
          </div>
          <input type="file" className="hidden" onChange={handleFileUpload} />
        </label>
        <Button
          onClick={() => onPaymentProofUploadButtonClick()}
          className="w-full mt-7 h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
          disabled={!file}
        >
          Complete Registration
        </Button>
      </div>
    </div>
  );
};
