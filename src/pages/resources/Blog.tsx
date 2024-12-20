import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Calendar } from 'lucide-react';

interface BlogPost {
  title: string;
  excerpt: string;
  date: string;
  image: string;
}

const blogPosts: BlogPost[] = [
  {
    title: "Getting Started with PDF Tools",
    excerpt: "Learn how to efficiently manage your PDF files with our comprehensive suite of tools.",
    date: "2024-01-15",
    image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Best Practices for Image Optimization",
    excerpt: "Discover techniques to optimize your images for better web performance.",
    date: "2024-01-10",
    image: "https://images.unsplash.com/photo-1542744094-24638eff58bb?auto=format&fit=crop&q=80&w=800"
  },
  {
    title: "Understanding Text Manipulation Tools",
    excerpt: "A deep dive into our text tools and how they can improve your workflow.",
    date: "2024-01-05",
    image: "https://images.unsplash.com/photo-1555421689-491a97ff2040?auto=format&fit=crop&q=80&w=800"
  }
];

export function Blog() {
  return (
    <Container>
      <PageHeader
        title="Blog"
        description="Latest updates, guides, and insights about our tools"
      />

      <div className="grid gap-8">
        {blogPosts.map((post, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img
                  className="h-48 w-full object-cover md:h-full md:w-48"
                  src={post.image}
                  alt={post.title}
                />
              </div>
              <div className="p-8">
                <div className="flex items-center text-sm text-gray-500">
                  <Calendar className="h-4 w-4 mr-2" />
                  {new Date(post.date).toLocaleDateString()}
                </div>
                <h2 className="mt-2 text-xl font-semibold text-gray-900">
                  {post.title}
                </h2>
                <p className="mt-3 text-gray-600">{post.excerpt}</p>
                <button className="mt-4 text-indigo-600 hover:text-indigo-500">
                  Read more →
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </Container>
  );
}