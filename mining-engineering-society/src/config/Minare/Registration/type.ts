export interface UserFormInterface {
  fullname?: string;
  email?: string;
  phonenumber?: string;
  collegename: string;
  branch: string;
  graduationyear: string;
  photoURL?: string;
  uid?: string;
  paymentProofImgURL?: string;
  profileSubmitted?: boolean;
  participatedEventTitles?: string[];
}
