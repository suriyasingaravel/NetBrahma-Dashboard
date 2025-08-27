import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white border-t-2 border-gray-300 py-5 px-4">
      <div className="text-center text-[14px] text-[#262626] max-w-7xl mx-auto">
        <p className="mb-3 sm:mb-2">
          © Copyright 2025 NetBramha Studio LLP. All Rights Reserved.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center text-[#262626] text-[14px] underline gap-4 sm:gap-6 md:gap-8">
          <a
            href="#"
            className="hover:text-gray-700 border-b-[1px] border-transparent  transition-colors duration-200"
          >
            FAQs
          </a>
          <a
            href="#"
            className="hover:text-gray-700 border-b-[1px] border-transparent  transition-colors duration-200"
          >
            Terms and Conditions
          </a>
          <a
            href="#"
            className="hover:text-gray-700 border-b-[1px] border-transparent  transition-colors duration-200"
          >
            Privacy Policy
          </a>
          <a
            href="#"
            className="hover:text-gray-700 border-b-[1px] border-transparent  transition-colors duration-200"
          >
            Raise a Dispute
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
