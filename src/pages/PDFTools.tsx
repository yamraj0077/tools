import React from 'react';
import { pdfRoutes } from '../routes/pdf.routes';
import { ToolList } from '../components/ToolList';
import { PageHeader } from '../components/common/PageHeader';
import { Container } from '../components/common/Container';
import { EmptyState } from '../components/common/EmptyState';

export function PDFTools() {
  const hasTools = pdfRoutes.length > 0;

  return (
    <Container>
      <PageHeader 
        title="PDF Tools"
        description="Powerful tools to work with PDF files"
      />
      {hasTools ? (
        <ToolList routes={pdfRoutes} />
      ) : (
        <EmptyState
          title="Tools Coming Soon"
          description="We're working on adding PDF tools. Check back soon!"
        />
      )}
    </Container>
  );
}