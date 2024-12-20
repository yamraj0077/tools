import React from 'react';
import { mediaRoutes } from '../routes/media.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';

export function MediaTools() {
  const hasTools = mediaRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="Media Tools"
        description="Process audio and video files with professional tools"
      />
      {hasTools ? (
        <ToolList routes={mediaRoutes} />
      ) : (
        <EmptyState
          title="Tools Coming Soon"
          description="We're working on adding media processing tools. Check back soon!"
        />
      )}
    </Container>
  );
}