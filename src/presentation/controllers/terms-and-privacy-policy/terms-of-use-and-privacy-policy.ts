import fg from 'fast-glob';
import fs from 'fs';
import { Controller, HttpResponse } from '../../protocols';

export class PDFController implements Controller {
  async handle(): Promise<HttpResponse> {
    const pdfFiles = await fg('**/src/pdfs/terms-of-use.pdf');

    if (pdfFiles.length === 0) {
      return {
        statusCode: 404,
        body: 'File doesnt exist',
      };
    }

    const pdfPath = pdfFiles[0];
    const pdfContent = fs.readFileSync(pdfPath);
    return {
      statusCode: 200,
      body: pdfContent,
    };
  }
}
