import React, { useState } from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    question: "Are all tools really free to use?",
    answer: "Yes, all our tools are completely free to use. We believe in providing accessible tools for everyone without any hidden costs.",
    category: "General"
  },
  {
    question: "Is my data secure when using your tools?",
    answer: "Absolutely. All file processing happens directly in your browser - your files are never uploaded to our servers. We take your privacy seriously.",
    category: "Security"
  },
  {
    question: "What's the maximum file size limit?",
    answer: "Since all processing happens in your browser, file size limits depend on your device's memory. Generally, we recommend files under 100MB for optimal performance.",
    category: "Usage"
  },
  {
    question: "Can I use these tools offline?",
    answer: "Currently, an internet connection is required to access our tools. However, once loaded, many tools can function offline.",
    category: "Usage"
  }
];

export function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index)
        : [...prev, index]
    );
  };

  return (
    <Container>
      <PageHeader
        title="Frequently Asked Questions"
        description="Find answers to common questions about our tools and services"
      />

      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <Card key={index} className="overflow-hidden">
            <button
              className="w-full text-left p-6 focus:outline-none"
              onClick={() => toggleItem(index)}
            >
              <div className="flex justify-between items-center">
                <div className="space-y-1">
                  <span className="text-sm font-medium text-indigo-600">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-medium text-gray-900">
                    {faq.question}
                  </h3>
                </div>
                {openItems.includes(index) ? (
                  <ChevronUp className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                )}
              </div>
            </button>
            
            {openItems.includes(index) && (
              <div className="px-6 pb-6">
                <div className="border-t pt-4">
                  <p className="text-gray-600">{faq.answer}</p>
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>
    </Container>
  );
}