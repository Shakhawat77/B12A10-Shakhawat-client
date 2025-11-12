import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => (
  <footer className="bg-sky-200 text-base-content pt-10">
    <div className="footer sm:footer-horizontal p-10 flex flex-col sm:flex-row justify-between flex-wrap">
      <nav className="mb-6 sm:mb-0">
        <h6 className="footer-title text-lg font-bold mb-2">Platform Features</h6>
        <a className="link link-hover">Browse Jobs – Find thousands of freelance opportunities</a>
        <a className="link link-hover">Post a Job – Hire skilled freelancers easily</a>
        <a className="link link-hover">Secure Authentication – Login via Email or Google</a>
        <a className="link link-hover">Job Management – Add, update, and track your jobs</a>
      </nav>
      <nav className="mb-6 sm:mb-0">
        <h6 className="footer-title text-lg font-bold mb-2">About Us</h6>
        <a className="link link-hover">How It Works – Learn how freelancers and clients connect</a>
        <a className="link link-hover">Contact – Reach out for help or partnership</a>
        <a className="link link-hover">Terms & Policies – Transparent user guidelines</a>
        <a className="link link-hover">FAQs – Quick answers to common questions</a>
      </nav>
      <nav>
        <h6 className="footer-title text-lg font-bold mb-2">Follow Us</h6>
        <div className="flex gap-4 text-2xl">
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" title="Twitter" className="hover:text-sky-500">
            <FaTwitter />
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" title="YouTube" className="hover:text-red-600">
            <FaYoutube />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" title="Facebook" className="hover:text-blue-600">
            <FaFacebook />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="hover:text-blue-700">
            <FaLinkedin />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" title="Instagram" className="hover:text-pink-600">
            <FaInstagram />
          </a>
        </div>
      </nav>

    </div>
    <div className="border-t border-gray-300 text-center py-4 mt-4">
      <p className="text-sm">
        © {new Date().getFullYear()} Freelance Market — All Rights Reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
