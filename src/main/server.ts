import { PrismaHelper } from '../infra/db/prisma/helpers/prisma-helper';
import env from './config/env';

PrismaHelper.connect(env.postgresUrl)
  .then(async () => {
    const app = (await import('./config/app')).default;
    app.listen(env.port, () =>
      console.log(`Server running at http://localhost:${env.port}`)
    );
  })
  .catch(console.error);
