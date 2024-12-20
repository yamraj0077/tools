import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Mail, Heart } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-white border-t mt-12">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">
              About Free Online Tools
            </h3>
            <p className="text-gray-600 text-sm">
              Free, fast, and secure online tools for developers, designers, and digital professionals. No registration required.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com" className="text-gray-400 hover:text-gray-500" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="https://twitter.com" className="text-gray-400 hover:text-gray-500" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:contact@freeonlinetools.io" className="text-gray-400 hover:text-gray-500" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Tools */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Popular Tools
            </h3>
            <ul className="space-y-2">
              <li><Link to="/pdf/merge" className="text-gray-600 hover:text-indigo-600">Merge PDF Files</Link></li>
              <li><Link to="/image/compress" className="text-gray-600 hover:text-indigo-600">Compress Images</Link></li>
              <li><Link to="/text/word-counter" className="text-gray-600 hover:text-indigo-600">Word Counter</Link></li>
              <li><Link to="/dev/json-formatter" className="text-gray-600 hover:text-indigo-600">JSON Formatter</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              <li><Link to="/blog" className="text-gray-600 hover:text-indigo-600">Blog</Link></li>
              <li><Link to="/tutorials" className="text-gray-600 hover:text-indigo-600">Tutorials</Link></li>
              <li><Link to="/faq" className="text-gray-600 hover:text-indigo-600">FAQ</Link></li>
              <li><Link to="/api" className="text-gray-600 hover:text-indigo-600">API Documentation</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact Us</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link to="/privacy" className="text-gray-600 hover:text-indigo-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-600 hover:text-indigo-600">Terms of Service</Link></li>
              <li><Link to="/cookies" className="text-gray-600 hover:text-indigo-600">Cookie Policy</Link></li>
              <li><Link to="/contact" className="text-gray-600 hover:text-indigo-600">Contact Us</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-center text-gray-500 text-sm flex items-center justify-center">
            © {currentYear} Free Online Tools. Made with <Heart className="h-4 w-4 mx-1 text-red-500" /> for developers.
          </p>
        </div>
      </div>
    </footer>
  );
}