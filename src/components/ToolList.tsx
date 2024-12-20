import React from 'react';
import { Route } from '../types/routes';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface ToolListProps {
  routes: Route[];
}

export function ToolList({ routes }: ToolListProps) {
  return (
    <div className="grid gap-4">
      {routes.map((route) => (
        <Link
          key={route.path}
          to={route.path}
          className="flex items-center justify-between p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 border border-gray-100"
        >
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{route.title}</h3>
            {route.description && (
              <p className="text-sm text-gray-600 mt-1">{route.description}</p>
            )}
          </div>
          <ArrowRight className="h-5 w-5 text-gray-400" />
        </Link>
      ))}
    </div>
  );
}