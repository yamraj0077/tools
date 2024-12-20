import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

export function PrivacyPolicy() {
  return (
    <Container>
      <PageHeader
        title="Privacy Policy"
        description="How we collect, use, and protect your data"
      />

      <Card className="p-8 prose max-w-none">
        <h2>Introduction</h2>
        <p>
          At Free Online Tools, we take your privacy seriously. This Privacy Policy explains how we collect, use, and protect your personal information when you use our website and services.
        </p>

        <h2>Information We Collect</h2>
        <h3>Information You Provide</h3>
        <ul>
          <li>Contact information (email address when contacting support)</li>
          <li>Files you upload for processing</li>
          <li>Feedback and correspondence</li>
        </ul>

        <h3>Automatically Collected Information</h3>
        <ul>
          <li>Device information</li>
          <li>Usage data</li>
          <li>IP address</li>
          <li>Browser type</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use your information to:</p>
        <ul>
          <li>Provide and improve our services</li>
          <li>Respond to your requests and support needs</li>
          <li>Analyze and improve website performance</li>
          <li>Protect against fraud and abuse</li>
        </ul>

        <h2>Data Security</h2>
        <p>
          We implement appropriate technical and organizational measures to protect your personal information. Files uploaded for processing are automatically deleted after completion and are never stored permanently.
        </p>

        <h2>Your Rights</h2>
        <p>You have the right to:</p>
        <ul>
          <li>Access your personal information</li>
          <li>Correct inaccurate data</li>
          <li>Request deletion of your data</li>
          <li>Object to data processing</li>
          <li>Data portability</li>
        </ul>

        <h2>Contact Us</h2>
        <p>
          If you have any questions about this Privacy Policy, please contact us at{' '}
          <a href="mailto:privacy@freeonlinetools.io">privacy@freeonlinetools.io</a>
        </p>
      </Card>
    </Container>
  );
}