import React from 'react';
import { Container } from '../../components/common/Container';
import { PageHeader } from '../../components/common/PageHeader';
import { Card } from '../../components/common/Card';

export function CookiePolicy() {
  return (
    <Container>
      <PageHeader
        title="Cookie Policy"
        description="Learn about how we use cookies on our website"
      />

      <Card className="p-8 prose max-w-none">
        <h2>What Are Cookies</h2>
        <p>
          Cookies are small text files that are stored on your computer or mobile device when you visit our website. They help us provide you with a better experience by remembering your preferences and analyzing how you use our site.
        </p>

        <h2>How We Use Cookies</h2>
        <p>We use cookies for the following purposes:</p>
        <ul>
          <li>Essential cookies: Required for the website to function properly</li>
          <li>Analytics cookies: Help us understand how visitors use our site</li>
          <li>Preference cookies: Remember your settings and preferences</li>
          <li>Performance cookies: Improve website speed and performance</li>
        </ul>

        <h2>Types of Cookies We Use</h2>
        <h3>Essential Cookies</h3>
        <p>These cookies are necessary for the website to function and cannot be switched off. They are usually only set in response to actions made by you which amount to a request for services.</p>

        <h3>Analytics Cookies</h3>
        <p>These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site.</p>

        <h2>Managing Cookies</h2>
        <p>Most web browsers allow you to control cookies through their settings preferences. However, limiting cookies may impact your experience of our website.</p>

        <h2>Updates to This Policy</h2>
        <p>We may update this Cookie Policy from time to time. Any changes will be posted on this page with an updated revision date.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about our Cookie Policy, please contact us at <a href="mailto:privacy@freeonlinetools.io">privacy@freeonlinetools.io</a>.</p>
      </Card>
    </Container>
  );
}