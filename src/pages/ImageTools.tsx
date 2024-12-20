import React from 'react';
import { imageRoutes } from '../routes/image.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';

export function ImageTools() {
  const hasTools = imageRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="Image Tools"
        description="Transform and optimize your images with ease"
      />
      {hasTools ? (
        <ToolList routes={imageRoutes} />
      ) : (
        <EmptyState
          title="Tools Coming Soon"
          description="We're working on adding image manipulation tools. Check back soon!"
        />
      )}
    </Container>
  );
}