import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, ArrowRight, Sparkles, Zap, Shield } from 'lucide-react';
import { searchTools } from '../utils/search';
import { Route } from '../types/routes';

export function Hero() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Route[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      setIsSearching(true);
      const results = searchTools(query);
      setSearchResults(results);
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
  }, []);

  const handleResultClick = (path: string) => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
    navigate(path);
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-50 to-white">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Hero Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pt-20 pb-24 text-center">
          {/* Main Heading */}
          <div className="space-y-6">
            <div className="inline-flex items-center px-4 py-2 bg-indigo-50 rounded-full mb-8">
              <Sparkles className="h-5 w-5 text-indigo-600 mr-2" />
              <span className="text-sm font-medium text-indigo-700">
                30+ Developer Tools, 100% Free
              </span>
            </div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900">
              <span className="block">Your Ultimate</span>
              <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Developer Toolkit
              </span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-gray-600">
              Transform, optimize, and manipulate your files with powerful tools designed for developers.
              No installation required - everything runs in your browser.
            </p>
          </div>

          {/* Search Bar */}
          <div className="mt-12 max-w-xl mx-auto relative">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="block w-full pl-10 pr-3 py-4 text-base border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="Search for tools..."
              />
            </div>

            {/* Search Results Dropdown */}
            {isSearching && (
              <div className="absolute z-10 w-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200">
                {searchResults.length > 0 ? (
                  <ul className="max-h-60 overflow-auto py-2">
                    {searchResults.map((result) => (
                      <li key={result.path}>
                        <button
                          onClick={() => handleResultClick(result.path)}
                          className="w-full px-4 py-2 text-left hover:bg-indigo-50 flex items-center justify-between group"
                        >
                          <div>
                            <div className="font-medium text-gray-900">{result.title}</div>
                            {result.description && (
                              <div className="text-sm text-gray-500">{result.description}</div>
                            )}
                          </div>
                          <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-indigo-600" />
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="px-4 py-6 text-center text-gray-500">
                    No tools found matching your search
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Feature Stats */}
          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 lg:grid-cols-3">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transform transition hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-indigo-50 rounded-lg mb-4">
                <Zap className="h-6 w-6 text-indigo-600" />
              </div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">30+</div>
              <div className="text-sm text-gray-600">Professional Tools</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transform transition hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-lg mb-4">
                <Shield className="h-6 w-6 text-green-600" />
              </div>
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Secure & Private</div>
            </div>
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 transform transition hover:scale-105">
              <div className="inline-flex items-center justify-center p-3 bg-purple-50 rounded-lg mb-4">
                <ArrowRight className="h-6 w-6 text-purple-600" />
              </div>
              <div className="text-4xl font-bold text-purple-600 mb-2">Fast</div>
              <div className="text-sm text-gray-600">Browser-Based Tools</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}