import React from 'react';
import { qrRoutes } from '../routes/qr.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';

export function QRTools() {
  const hasTools = qrRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="QR Code Tools"
        description="Generate and scan QR codes for any purpose"
      />
      {hasTools ? (
        <ToolList routes={qrRoutes} />
      ) : (
        <EmptyState
          title="Tools Coming Soon"
          description="We're working on adding QR code tools. Check back soon!"
        />
      )}
    </Container>
  );
}