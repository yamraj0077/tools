import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Wrench, FileText, Image, Type, Video, Code, QrCode, Settings } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { icon: FileText, label: 'PDF Tools', href: '/pdf' },
    { icon: Image, label: 'Image Tools', href: '/image' },
    { icon: Type, label: 'Text Tools', href: '/text' },
    { icon: Video, label: 'Media Tools', href: '/media' },
    { icon: Code, label: 'Dev Tools', href: '/dev' },
    { icon: QrCode, label: 'QR Tools', href: '/qr' },
    { icon: Settings, label: 'Utilities', href: '/utility' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link to="/" className="flex items-center space-x-2">
            <Wrench className="h-8 w-8 text-indigo-600" />
            <span className="text-xl font-bold text-gray-900">Free Online Tools</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="text-gray-600 hover:text-indigo-600 flex items-center space-x-1"
              >
                <item.icon className="h-4 w-4" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-gray-900"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {menuItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block px-3 py-2 rounded-md text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 flex items-center space-x-2"
                onClick={() => setIsMenuOpen(false)}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}