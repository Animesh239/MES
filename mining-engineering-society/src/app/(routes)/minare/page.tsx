import { LandingPage } from "@/components/features/Minare/landing/page";
import { getSession } from "@/lib/session";
import { getUserRegistration } from "@/actions/minare/registration/action";

async function MinarePage() {
  const session = await getSession();
  let userRegistration = null;

  if (session) {
    const result = await getUserRegistration(session.userId);
    if (result.success) {
      userRegistration = result.data;
    }
  }

  // Transform registration data to match UserFormInterface structure expected by Profile
  const userData = userRegistration
    ? {
        fullname: userRegistration.name,
        email: userRegistration.email,
        phonenumber: userRegistration.phoneNumber,
        collegename: userRegistration.collegeName,
        branch: userRegistration.branch,
        photoURL: userRegistration.photoUrl || "",
        graduationyear: userRegistration.graduationYear,
        uid: "", // No longer needed or can use userId
        // paymentProofImgURL is not in UserFormInterface apparently, but was in LandingPage state.
        // checking LandingPage state: paymentProofImgURL: ""
        paymentProofImgURL: userRegistration.paymentProofUrl,
        profileSubmitted: true,
      }
    : null;

  return (
    <div className="min-h-screen h-auto ">
      <LandingPage initialUserData={userData} isLoggedIn={!!session} />
    </div>
  );
}
export default MinarePage;
