import { Mail, Phone, MapPin } from "lucide-react";
import Link from "next/link";

export default function ContactDetails() {
  return (
    <div className="space-y-8 w-full">
      <h1 className="text-5xl font-bold text-gray-100 text-center md:text-left bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Contact Us
      </h1>
      <h2 className="text-xl font-semibold text-gray-200 text-center md:text-left">
        Feel free to reach out to us for more information.
      </h2>

      <div className="space-y-6">
        {/* Email */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <Mail className="w-6 h-6 text-blue-500" />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium text-gray-200">Email</h3>
            <p className="text-gray-400 text-lg">
              Any issues or suggestions? Mail us at
            </p>
            <Link
              href="mailto:anc.nitr@gmail.com"
              className="text-blue-500 hover:text-blue-400 transition-colors text-lg"
            >
              mesnitr@gmail.com
            </Link>
          </div>
        </div>

        {/* Phone */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <Phone className="w-6 h-6 text-blue-500" />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium text-gray-200">Phone</h3>
            <p className="text-gray-400 text-lg">
              Reach to our representatives anytime!
            </p>
            <div className="space-y-1">
              <Link
                href="tel:+917978414351"
                className="block text-blue-500 hover:text-blue-400 transition-colors text-lg"
              >
                +91-333333333 (Animesh Barik)
              </Link>
              <Link
                href="tel:+918340153562"
                className="block text-blue-500 hover:text-blue-400 transition-colors text-lg"
              >
                +91-4398598573498 (Animesh Barik)
              </Link>
            </div>
          </div>
        </div>

        {/* Address */}
        <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0 md:space-x-4">
          <MapPin className="w-6 h-6 text-blue-500" />
          <div className="text-center md:text-left">
            <h3 className="text-xl font-medium text-gray-200">NIT Rourkela</h3>
            <p className="text-gray-400 text-lg">Visit us in person!</p>
            <Link
              href="https://goo.gl/maps/Hqf6mqsjVdv4j4LY6"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-400 transition-colors text-lg"
            >
              View on Google Maps
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
