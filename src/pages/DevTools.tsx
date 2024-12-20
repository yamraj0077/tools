import React from 'react';
import { devRoutes } from '../routes/dev.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';

export function DevTools() {
  const hasTools = devRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="Developer Tools"
        description="Essential tools for web developers"
      />
      {hasTools ? (
        <ToolList routes={devRoutes} />
      ) : (
        <EmptyState
          title="Tools Coming Soon"
          description="We're working on adding developer tools. Check back soon!"
        />
      )}
    </Container>
  );
}