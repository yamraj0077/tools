import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';
import { Code, Terminal, Lock } from 'lucide-react';

export function APIDocumentation() {
  return (
    <Container>
      <PageHeader
        title="API Documentation"
        description="Integrate our tools into your applications with our REST API"
      />

      <div className="space-y-8">
        <Card className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Terminal className="h-6 w-6 text-indigo-600" />
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">Getting Started</h2>
              <p className="mt-2 text-gray-600">
                To use our API, you'll need an API key. Sign up for a free account to get started.
              </p>
              <div className="mt-4">
                <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700">
                  Get API Key
                </button>
              </div>
            </div>
          </div>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Authentication</h3>
            <div className="bg-gray-50 rounded-lg p-4">
              <pre className="text-sm text-gray-700 overflow-x-auto">
                {`curl -X GET https://api.freeonlinetools.io/v1/tools \\
-H "Authorization: Bearer YOUR_API_KEY"`}
              </pre>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Rate Limits</h3>
            <ul className="space-y-2 text-gray-600">
              <li>Free tier: 100 requests/hour</li>
              <li>Pro tier: 1000 requests/hour</li>
              <li>Enterprise tier: Custom limits</li>
            </ul>
          </Card>
        </div>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Available Endpoints</h3>
          <div className="space-y-4">
            {[
              {
                method: 'POST',
                endpoint: '/v1/pdf/merge',
                description: 'Merge multiple PDF files'
              },
              {
                method: 'POST',
                endpoint: '/v1/image/compress',
                description: 'Compress image files'
              },
              {
                method: 'POST',
                endpoint: '/v1/text/analyze',
                description: 'Analyze text content'
              }
            ].map((endpoint, index) => (
              <div key={index} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                <span className={`px-2 py-1 rounded text-sm font-medium ${
                  endpoint.method === 'GET' ? 'bg-green-100 text-green-800' :
                  endpoint.method === 'POST' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {endpoint.method}
                </span>
                <div>
                  <code className="text-sm font-mono">{endpoint.endpoint}</code>
                  <p className="mt-1 text-sm text-gray-600">{endpoint.description}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </Container>
  );
}