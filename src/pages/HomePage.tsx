import React from 'react';
import { Hero } from '../components/Hero';
import { ToolGrid } from '../components/ToolGrid';
import { tools } from '../data/tools';
import { useToolNavigation } from '../hooks/useToolNavigation';
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react';

export default function HomePage() {
  const { handleToolClick } = useToolNavigation();

  return (
    <div>
      <Hero />

      {/* Popular Tools Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-yellow-50 rounded-full mb-4">
              <Star className="h-5 w-5 text-yellow-600 mr-2" />
              <span className="text-sm font-medium text-yellow-700">Most Used Tools</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Popular Developer Tools</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover our most popular tools used by thousands of developers worldwide
            </p>
          </div>
          <ToolGrid tools={tools} onToolClick={handleToolClick} />
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-purple-50 rounded-full mb-4">
              <Users className="h-5 w-5 text-purple-600 mr-2" />
              <span className="text-sm font-medium text-purple-700">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Built for Developers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our tools are designed with developers in mind, focusing on efficiency and ease of use
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: 'Browser-Based',
                description: 'No installation required. All tools run directly in your browser.',
                icon: ArrowRight,
              },
              {
                title: 'Privacy First',
                description: 'Your files never leave your device. All processing happens locally.',
                icon: Shield,
              },
              {
                title: 'Lightning Fast',
                description: 'Optimized for performance to handle your tasks quickly and efficiently.',
                icon: Zap,
              },
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-lg mb-4">
                  <feature.icon className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}