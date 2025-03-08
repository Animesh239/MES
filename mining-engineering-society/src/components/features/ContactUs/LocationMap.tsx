import { Suspense } from "react";

function Loading() {
  return (
    <div className="flex items-center justify-center h-96">
      <div className="text-white text-4xl">Loading map...</div>
    </div>
  );
}

export default function LocationMap() {
  return (
    <div>
      <h2 className="text-5xl font-bold mb-5 bg-gradient-to-t from-white to-gray-500 bg-clip-text text-transparent">
        Our Location
      </h2>
      <div className="aspect-w-16 aspect-h-9">
        <Suspense fallback={<Loading />}>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6445808124536!2d84.89853458012789!3d22.253560127430106!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201e7f53cd73ab%3A0xf3a32aef5a80d24b!2sMining%20Department%2C%20National%20Institute%20of%20Technology%2C%20Sector%201%2C%20Rourkela%2C%20Odisha%20769008!5e0!3m2!1sen!2sin!4v1741447384971!5m2!1sen!2sin"
            width="100%"
            height="500vh"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Google Map of our location"
            className="rounded-lg"
          ></iframe>
        </Suspense>
      </div>
    </div>
  );
}
