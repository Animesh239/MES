"use client";

import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    institution: "",
    email: "",
    phone: "",
    query: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const serviceId = process.env.NEXT_PUBLIC_SERVICE_ID!;
      const templateId = process.env.NEXT_PUBLIC_TEMPLATE_ID!;
      const userId = process.env.NEXT_PUBLIC_USER_ID!;

      const result = await emailjs.send(
        serviceId,
        templateId,
        formData,
        userId
      );
      console.log(result.text);
      setSubmitStatus("Message sent successfully!");
      setFormData({
        name: "",
        institution: "",
        email: "",
        phone: "",
        query: "",
      });
    } catch (error) {
      console.log(error);
      setSubmitStatus("Failed to send message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 w-full">
      <div>
        <Label htmlFor="name" className="text-white text-xl">
          Name
        </Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="bg-gray-800 text-gray-100 border-gray-700 focus:border-white mt-1"
        />
      </div>
      <div>
        <Label htmlFor="institution" className="text-white text-xl">
          Institution
        </Label>
        <Input
          id="institution"
          name="institution"
          value={formData.institution}
          onChange={handleChange}
          required
          className="bg-gray-800 text-gray-100 border-gray-700 focus:border-white mt-1"
        />
      </div>
      <div>
        <Label htmlFor="email" className="text-white text-xl">
          Email
        </Label>
        <Input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="bg-gray-800 text-gray-100 border-gray-700 focus:border-white mt-1"
        />
      </div>
      <div>
        <Label htmlFor="phone" className="text-white text-xl">
          Phone Number
        </Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
          className="bg-gray-800 text-gray-100 border-gray-700 focus:border-white mt-1"
        />
      </div>
      <div>
        <Label htmlFor="query" className="text-white text-xl">
          Query
        </Label>
        <Textarea
          id="query"
          name="query"
          value={formData.query}
          onChange={handleChange}
          required
          className="bg-gray-800 text-gray-100 border-gray-700 focus:border-white mt-1"
        />
      </div>
      <div className="p-[2px] bg-gradient-to-r from-blue-400 to-purple-600 rounded-2xl transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black hover:bg-black rounded-2xl text-white"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </Button>
      </div>
      {submitStatus && (
        <p className="text-sm text-center mt-2 text-green-400">
          {submitStatus}
        </p>
      )}
    </form>
  );
}
