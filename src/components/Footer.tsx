'use client';

import Link from 'next/link';
import { useSettings } from '@/hooks/useSettings';
import { useMemo } from 'react';

export default function Footer() {
  const { settings } = useSettings();

  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-xl font-bold text-white mb-3">MITC</h3>
            <p className="text-sm text-gray-400">
              Mateen IT Corp - Your trusted partner for laptop solutions since 2013.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-white mb-3">Quick Links</h4>
            <ul className="text-sm space-y-2">
              <li>
                <Link href="/" className="hover:text-primary-400 transition">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/services" className="hover:text-primary-400 transition">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-primary-400 transition">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/ratings" className="hover:text-primary-400 transition">
                  Reviews
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-white mb-3">Contact</h4>
            <ul className="text-sm space-y-2">
              {settings?.salesPersonPhone && (
                <li>
                  <a
                    href={`tel:${settings.salesPersonPhone}`}
                    className="hover:text-primary-400 transition"
                  >
                    📁 {settings.salesPersonPhone}
                  </a>
                </li>
              )}
              {settings?.salesPersonEmail && (
                <li>
                  <a
                    href={`mailto:${settings.salesPersonEmail}`}
                    className="hover:text-primary-400 transition"
                  >
                    ✉️ {settings.salesPersonEmail}
                  </a>
                </li>
              )}
              <li>
                <Link href="/contact" className="hover:text-primary-400 transition">
                  📏 Send Message
                </Link>
              </li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold text-white mb-3">Follow Us</h4>
            <div className="flex gap-4">
              {settings?.instagramUrl && (
                <a
                  href={settings.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                  title="Instagram"
                >
                  📸
                </a>
              )}
              {settings?.facebookUrl && (
                <a
                  href={settings.facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                  title="Facebook"
                >
                  f
                </a>
              )}
              {settings?.twitterUrl && (
                <a
                  href={settings.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                  title="Twitter"
                >
                  🐦
                </a>
              )}
              {settings?.linkedinUrl && (
                <a
                  href={settings.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary-400 transition"
                  title="LinkedIn"
                >
                  in
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; {currentYear} MITC - Mateen IT Corp. All rights reserved.</p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="#" className="hover:text-primary-400 transition">
                Privacy Policy
              </Link>
              <Link href="#" className="hover:text-primary-400 transition">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
