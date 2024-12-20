import React from 'react';
import { Wrench } from 'lucide-react';
import { Header } from './Header';
import { Footer } from './Footer';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      <main>{children}</main>
      <Footer />
    </div>
  );
}