import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Play, Clock, BookOpen } from 'lucide-react';

interface Tutorial {
  title: string;
  description: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
}

const tutorials: Tutorial[] = [
  {
    title: "PDF Merging and Splitting Guide",
    description: "Learn how to combine multiple PDFs and split large documents efficiently.",
    duration: "10 min",
    level: "Beginner",
    category: "PDF Tools"
  },
  {
    title: "Advanced Image Editing Techniques",
    description: "Master the image editor with professional editing techniques.",
    duration: "15 min",
    level: "Intermediate",
    category: "Image Tools"
  },
  {
    title: "Regular Expressions Masterclass",
    description: "Deep dive into using the regex tester for complex pattern matching.",
    duration: "20 min",
    level: "Advanced",
    category: "Developer Tools"
  }
];

export function Tutorials() {
  return (
    <Container>
      <PageHeader
        title="Tutorials"
        description="Step-by-step guides to help you make the most of our tools"
      />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {tutorials.map((tutorial, index) => (
          <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 text-indigo-800">
                  {tutorial.category}
                </span>
                <span className={`text-sm font-medium ${
                  tutorial.level === 'Beginner' ? 'text-green-600' :
                  tutorial.level === 'Intermediate' ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {tutorial.level}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900">
                {tutorial.title}
              </h3>

              <p className="text-gray-600">
                {tutorial.description}
              </p>

              <div className="flex items-center justify-between pt-4">
                <div className="flex items-center text-sm text-gray-500">
                  <Clock className="h-4 w-4 mr-1" />
                  {tutorial.duration}
                </div>
                <button className="inline-flex items-center text-indigo-600 hover:text-indigo-500">
                  Start Tutorial
                  <Play className="h-4 w-4 ml-1" />
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}