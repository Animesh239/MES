import ContactForm from "@/components/features/ContactUs/ContactForm";
import ContactDetails from "@/components/features/ContactUs/ContactDetails";
import LocationMap from "@/components/features/ContactUs/LocationMap";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-black text-white py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start mb-12">
            <ContactDetails />
            <ContactForm />
          </div>
          <LocationMap />
        </div>
      </div>
    </main>
  );
}
