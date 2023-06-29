import { Router } from 'express';
import { adaptPdfRoute } from '../adapters/express-route-adapter';
import { makePDFController } from '../factories/terms-of-use';

export default (router: Router): void => {
  router.get('/terms-of-use.pdf', adaptPdfRoute(makePDFController()));
};
