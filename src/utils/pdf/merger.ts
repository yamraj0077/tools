import { PDFDocument } from 'pdf-lib';

export async function mergePDFs(files: File[]): Promise<Uint8Array> {
  const mergedPdf = await PDFDocument.create();

  for (const file of files) {
    const fileBuffer = await file.arrayBuffer();
    const pdf = await PDFDocument.load(fileBuffer);
    const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
    copiedPages.forEach((page) => mergedPdf.addPage(page));
  }

  return mergedPdf.save();
}

export async function splitPDF(file: File, ranges: string): Promise<Uint8Array[]> {
  const fileBuffer = await file.arrayBuffer();
  const pdf = await PDFDocument.load(fileBuffer);
  const pageCount = pdf.getPageCount();

  const rangeList = ranges.split(',').map(range => {
    const [start, end] = range.split('-').map(num => parseInt(num.trim()));
    return { start: start - 1, end: end - 1 };
  });

  const pdfs: Uint8Array[] = [];

  for (const range of rangeList) {
    if (range.start < 0 || range.end >= pageCount) continue;

    const newPdf = await PDFDocument.create();
    const pages = await newPdf.copyPages(pdf, Array.from(
      { length: range.end - range.start + 1 },
      (_, i) => range.start + i
    ));
    pages.forEach(page => newPdf.addPage(page));
    pdfs.push(await newPdf.save());
  }

  return pdfs;
}