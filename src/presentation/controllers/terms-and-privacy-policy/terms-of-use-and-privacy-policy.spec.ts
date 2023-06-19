import { Request, Response } from 'express';
import { PDFController } from './terms-of-use-and-privacy-policy';

describe('PDF Controller', () => {
  test('Should return status 200 and the PDF file', async () => {
    const req = {} as Request;
    const res = {
      status: jest.fn().mockReturnThis(),
      contentType: jest.fn().mockReturnThis(),
      sendFile: jest.fn(),
    } as unknown as Response;

    const pdfController = new PDFController();
    await pdfController.handle(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.contentType).toHaveBeenCalledWith('application/pdf');
    expect(res.sendFile).toHaveBeenCalledWith('src/assets/terms-of-use.pdf');
  });
});
