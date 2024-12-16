"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin } from "lucide-react";
import Modal from "@/components/ui/modal";

export default function Footer() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <footer className="bg-black text-white border-t-[0.5px] border-gray-700">
      <div className="container mx-auto px-4 py-8 md:mr-20 2xl:mr-24">
        <div className="flex flex-wrap justify-between items-start">
          {/* Social Links and Logos Section */}
          <div className="w-full lg:w-1/3 mb-6 lg:mb-0">
            <div className="flex justify-center lg:justify-start space-x-4 mb-3">
              <Link
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Facebook className="text-white hover:text-gray-300" />
              </Link>
              <Link
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Twitter className="text-white hover:text-gray-300" />
              </Link>
              <Link
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Instagram className="text-white hover:text-gray-300" />
              </Link>
              <Link
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="text-white hover:text-gray-300" />
              </Link>
            </div>
            <div className="flex justify-center items-center lg:mr-28">
              <span className="relative z-5 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 text-3xl font-semibold text-center xsm:text-start">
                Mining Engineering Society
              </span>
            </div>
            <div className="flex justify-center lg:justify-start space-x-5 mt-3">
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733770163/mes/fi0wou0kizqqbuysezfm.svg"
                alt="MES"
                width={60}
                height={60}
              />
              <Image
                src="https://res.cloudinary.com/dhv234qct/image/upload/v1733771631/mes/xac8wdivrcpuag1qt6gu.svg"
                alt="NITRKL"
                width={60}
                height={60}
              />
            </div>
          </div>

          {/* Contact and Quick Links Section */}
          <div className="w-full lg:w-2/3 flex flex-wrap justify-between">
            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="text-xl font-bold mb-2">Call Us</h3>
              <p className="mb-1">
                <Link href="tel:+1234567890" className="hover:underline">
                  +1 (234) 567-890
                </Link>
              </p>
              <p className="mb-1">
                <Link href="tel:+1987654321" className="hover:underline">
                  +1 (987) 654-321
                </Link>
              </p>
            </div>

            <div className="w-full lg:w-1/3 mb-6 lg:mb-0 text-center lg:text-left">
              <h3 className="text-xl font-bold mb-2">Email Us</h3>
              <p className="mb-1">
                <Link
                  href="mailto:info@example.com"
                  className="hover:underline"
                >
                  info@example.com
                </Link>
              </p>
              <p className="mb-1">
                <Link
                  href="mailto:support@example.com"
                  className="hover:underline"
                >
                  support@example.com
                </Link>
              </p>
            </div>

            <div className="w-full lg:w-1/3 text-center lg:text-left">
              <h3 className="text-xl font-bold mb-2">Quick Links</h3>
              <p className="mb-1">
                <Link
                  href="https://www.nitrkl.ac.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  NIT Rourkela Website
                </Link>
              </p>
              <p className="mb-1">
                <Link
                  href="https://www.nitrkl.ac.in/MN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Mining Dept. Site
                </Link>
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="flex items-center justify-center lg:justify-start text-white hover:underline mx-auto lg:mx-0"
              >
                Mining Dept. Location
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col lg:flex-row items-center mt-8">
          <div className="mb-2 text-gray-400">
            Copyright and All rights reserved 2025
          </div>
          <div className="w-[850px]"></div>
          <div className="mb-2 text-gray-400">Made with 💜 by MES NITRKL</div>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="aspect-square w-full max-w-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3692.654731979682!2d84.89967021494428!3d22.25338748533651!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a201f72bbd561c3%3A0xab5c70e76a7b5a!2sDepartment%20of%20Mining%20Engineering%2C%20NIT%20Rourkela!5e0!3m2!1sen!2sin!4v1652162016781!5m2!1sen!2sin"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
          ></iframe>
        </div>
      </Modal>
    </footer>
  );
}
