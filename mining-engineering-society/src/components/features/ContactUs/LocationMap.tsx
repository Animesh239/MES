export default function LocationMap() {
  return (
    <div>
      <h2 className="text-5xl font-bold mb-5 text-white">Our Location</h2>
      <div className="aspect-w-16 aspect-h-9">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.6576948447!2d84.89992661495637!3d22.25340798534676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f72bbd561c3%3A0xab5c70e76a7b5a!2sNational%20Institute%20of%20Technology%2C%20Rourkela!5e0!3m2!1sen!2sin!4v1679901309304!5m2!1sen!2sin"
          width="100%"
          height="500vh"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Map of our location"
          className="rounded-lg"
        ></iframe>
      </div>
    </div>
  );
}
