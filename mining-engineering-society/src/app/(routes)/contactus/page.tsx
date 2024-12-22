import ContactForm from "@/components/features/ContactUs/ContactForm";

export default function ContactPage() {
  return (
    <div>
      <div className="mt-28 mb-10 text-center text-4xl xxsm:text-6xl font-semibold bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Contact Us
      </div>
      <ContactForm />
    </div>
  );
}
