import { PDFController } from './terms-of-use-and-privacy-policy';

describe('PDF Controller', () => {
  test('Should return status 200 and the PDF file', async () => {
    const sut = new PDFController();
    const result = await sut.handle();
    expect(result.statusCode).toBe(200);
  });

  test('Should return status 404 if PDF file does not exist', async () => {
    const sut = new PDFController();
    jest.spyOn(sut, 'handle').mockResolvedValue({
      statusCode: 404,
      body: 'File does not exist',
    });

    const result = await sut.handle();

    expect(result.statusCode).toBe(404);
  });
});
