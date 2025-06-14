"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import axios from "axios";

interface ContactProps {
  translations: {
    name: string;
    phone: string;
    email: string;
    message: string;
    msgSent: string;
    send: string;
  };
}

export default function ContactInfo({ translations }: ContactProps) {
  const [submitted, setSubmitted] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/messages/`,
        formData
      );
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    } catch (error) {
      console.error("Submission error:", error);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          type="text"
          placeholder={translations.name}
          className="w-full border border-gray-300 p-3 rounded"
          autoFocus
          required
        />
        <input
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          type="text"
          placeholder={translations.phone}
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          type="email"
          placeholder={translations.email}
          className="w-full border border-gray-300 p-3 rounded"
          required
        />
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder={translations.message}
          className="w-full border border-gray-300 p-3 rounded"
          rows={5}
          required
        />
        {submitted && (
          <div className="bg-green-100 border border-green-400 text-green-700 p-3 text-center rounded">
            {translations.msgSent}
          </div>
        )}
        <button
          type="submit"
          className="bg-blue-600 text-white font-semibold py-2 px-6 rounded hover:bg-blue-700"
        >
          {translations.send}
        </button>
      </form>
    </>
  );
}
