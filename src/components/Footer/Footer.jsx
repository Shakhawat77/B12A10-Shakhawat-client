import React from "react";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";

const Footer = () => (
  <footer className="bg-gradient-to-r from-[#823434] via-[#615217] to-[#367c40] text-white pt-10">
    <div className="footer sm:footer-horizontal p-10 flex flex-col sm:flex-row justify-between flex-wrap">
      <nav className="mb-6 sm:mb-0 max-w-sm">
        <h6 className="footer-title text-lg font-bold mb-2 text-white">
          Platform Features
        </h6>
        <a className="link link-hover text-white dark:text-gray-300">
          Browse Jobs – Find thousands of freelance opportunities
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          Post a Job – Hire skilled freelancers easily
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          Secure Authentication – Login via Email or Google
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          Job Management – Add, update, and track your jobs
        </a>
      </nav>

      <nav className="mb-6 sm:mb-0 max-w-sm">
        <h6 className="footer-title text-lg font-bold mb-2 text-white">
          About Us
        </h6>
        <a className="link link-hover text-white dark:text-gray-200">
          How It Works – Learn how freelancers and clients connect
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          Contact – Reach out for help or partnership
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          Terms & Policies – Transparent user guidelines
        </a>
        <a className="link link-hover text-white dark:text-gray-200">
          FAQs – Quick answers to common questions
        </a>
      </nav>

      <nav>
        <h6 className="footer-title text-lg font-bold mb-2 text-white">
          Follow Us
        </h6>
        <div className="flex gap-4 text-2xl">
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Twitter"
            className="hover:text-[#FF6B6B] transition-colors"
          >
            <FaTwitter />
          </a>
          <a
            href="https://youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            title="YouTube"
            className="hover:text-[#FF6B6B] transition-colors"
          >
            <FaYoutube />
          </a>
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Facebook"
            className="hover:text-[#FF6B6B] transition-colors"
          >
            <FaFacebook />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            title="LinkedIn"
            className="hover:text-[#FF6B6B] transition-colors"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            title="Instagram"
            className="hover:text-[#FF6B6B] transition-colors"
          >
            <FaInstagram />
          </a>
        </div>
      </nav>
    </div>

    <div className="border-t border-gray-400 text-center py-4 mt-4">
      <p className="text-sm text-white font-medium">
        © {new Date().getFullYear()} Freelance Market — All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
