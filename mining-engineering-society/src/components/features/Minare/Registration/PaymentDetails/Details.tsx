import { Button } from "@/components/ui/button";

export const PaymentDeatails = ({
  onPaymentDoneButtonClick
}: {
  onPaymentDoneButtonClick: () => void;
}) => {
  return (
    <div>
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-2xl font-bold text-center text-white">
          Payment Details
        </h2>
        <div className="bg-white/[0.03] border border-white/10 rounded-xl p-6 space-y-4">
          <div className="space-y-2">
            <h3 className="font-semibold text-white/30">Registration Fee</h3>
            <p className="text-gray-300">
              ₹400 /- (No additional charges for events)
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold text-white/30">Bank Details</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-400">Account Name</p>
                <p className="text-white">MS MINING ENGG SOCIETY</p>
              </div>
              <div>
                <p className="text-gray-400">Account Number</p>
                <p className="text-white">10138951149</p>
              </div>
              <div>
                <p className="text-gray-400">IFSC Code</p>
                <p className="text-white">SBIN0002109</p>
              </div>
            </div>
          </div>
        </div>
        <Button
          variant="default"
          onClick={() => onPaymentDoneButtonClick()}
          className="w-full h-10 sm:h-12 bg-white font-normal font-roboto text-[#211330] hover:bg-white/90 rounded-lg transition-all duration-200 disabled:opacity-50 text-sm sm:text-base"
        >
          Continue to Upload Proof
        </Button>
      </div>
    </div>
  );
};
