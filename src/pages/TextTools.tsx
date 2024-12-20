import React from 'react';
import { textRoutes } from '../routes/text.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';

export function TextTools() {
  const hasTools = textRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="Text Tools"
        description="Process and transform text with powerful utilities"
      />
      {hasTools && <ToolList routes={textRoutes} />}
    </Container>
  );
}