'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import nobglogo from '@/assets/nobglogo.png';

const Footer = () => {
  return (
    <footer className="bg-[#2a2a2a] text-white py-16 px-6 sm:px-8 lg:px-16 font-sans opacity-100 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Section: DECRYPT THE SYSTEM */}
        <div className="text-center mb-16">
          <h2 className="text-4xl lg:text-6xl font-black uppercase tracking-wide text-white">
            DECRYPT THE SYSTEM
          </h2>
        </div>

        {/* Logo and Navigation Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          
          {/* Left: Logo and Name */}
          <div className="lg:col-span-1">
            <div className="flex items-start gap-3 mb-6">
              <Image src={nobglogo} alt="HRCC Logo" className="h-16 w-auto" />
            </div>
            <div className="uppercase tracking-wider leading-relaxed font-bold text-2xl lg:text-3xl mb-4">
              <p>HackerRank</p>
              <p>Campus Crew</p>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Empowering the next generation of developers through coding challenges and community events.
            </p>
          </div>

          {/* Middle: Navigation Links */}
          <div className="lg:col-span-1">
            <div className="space-y-3">
              <Link href="#home" className="block text-lg hover:text-green-500 transition-colors duration-200">Home</Link>
              <Link href="#domains" className="block text-lg hover:text-green-500 transition-colors duration-200">Domains</Link>
              <Link href="#team" className="block text-lg hover:text-green-500 transition-colors duration-200">Team</Link>
              <Link href="#events" className="block text-lg hover:text-green-500 transition-colors duration-200">Events</Link>
              <Link href="mailto:hrccsrm@gmail.com" className="block text-lg hover:text-green-500 transition-colors duration-200">Contact Us</Link>
            </div>
          </div>

          {/* Right: Contact & Socials */}
          <div className="lg:col-span-1">
            <h3 className="text-lg font-semibold mb-6 text-green-400">Connect With Us</h3>
            
            {/* Email */}
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"/>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"/>
                </svg>
              </div>
              <a href="mailto:hrccsrm@gmail.com" className="hover:text-green-400 transition-colors duration-200">hrccsrm@gmail.com</a>
            </div>

            {/* Social Icons */}
            <div className="flex gap-4">
              <a href="https://x.com/hrccsrm" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/hackerrank-campus-crew-srmist-4b84273b6/" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://github.com/HRCC-SRM" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-200">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="https://www.instagram.com/hrcc.srm/" className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-green-500 transition-colors duration-200">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849s.012-3.584.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.337 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.337-.2 6.78-2.618 6.98-6.98.058-1.28.072-1.689.072-4.948s-.014-3.667-.072-4.947c-.2-4.337-2.618-6.78-6.98-6.98-1.281-.058-1.689-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Credit & Copyright */}
        <div className="border-t border-gray-600 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              Made with <span className="text-green-500">💚</span> by HackerRank Campus Crew
            </p>
            <p className="text-gray-400 text-sm">
              © 2026 HackerRank Campus Crew. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;