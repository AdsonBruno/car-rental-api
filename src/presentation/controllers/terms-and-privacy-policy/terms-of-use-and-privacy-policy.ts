import { Request, Response } from 'express';
import fg from 'fast-glob';

export class PDFController {
  async handle(req: Request, res: Response): Promise<void> {
    const pdfFiles = await fg('**/src/assets/terms-of-use.pdf');

    const pdfPath = pdfFiles[0];

    res.status(200).contentType('application/pdf').sendFile(pdfPath);
  }
}
