import { PDFController } from '../../presentation/controllers/terms-and-privacy-policy/terms-of-use-and-privacy-policy';

export const makePDFController = (): PDFController => {
  return new PDFController();
};
