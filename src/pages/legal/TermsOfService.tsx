import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

export function TermsOfService() {
  return (
    <Container>
      <PageHeader
        title="Terms of Service"
        description="Please read these terms carefully before using our services"
      />

      <Card className="p-8 prose max-w-none">
        <h2>1. Acceptance of Terms</h2>
        <p>
          By accessing and using Free Online Tools, you accept and agree to be bound by the terms and provision of this agreement.
        </p>

        <h2>2. Description of Service</h2>
        <p>
          Free Online Tools provides web-based tools for file conversion, compression, and manipulation. Our services are provided "as is" and "as available" without any warranties.
        </p>

        <h2>3. User Obligations</h2>
        <p>You agree to:</p>
        <ul>
          <li>Use the service for lawful purposes only</li>
          <li>Not upload malicious files or content</li>
          <li>Not attempt to circumvent any security measures</li>
          <li>Not use the service to infringe on others' rights</li>
        </ul>

        <h2>4. Intellectual Property</h2>
        <p>
          All content, features, and functionality on Free Online Tools are owned by us and protected by international copyright, trademark, and other intellectual property laws.
        </p>

        <h2>5. Privacy and Data Protection</h2>
        <p>
          Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your information.
        </p>

        <h2>6. Limitation of Liability</h2>
        <p>
          We shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.
        </p>

        <h2>7. Changes to Terms</h2>
        <p>
          We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page.
        </p>

        <h2>8. Contact Information</h2>
        <p>
          For any questions about these Terms of Service, please contact us at{' '}
          <a href="mailto:legal@freeonlinetools.io">legal@freeonlinetools.io</a>
        </p>
      </Card>
    </Container>
  );
}