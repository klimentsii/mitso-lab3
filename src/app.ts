import express from 'express';

import swaggerUI from 'swagger-ui-express';
import path from 'path';
import YAML from 'yamljs';

import tourRouter from "./resources/tour/tour.router";
import scheduleRouter from "./resources/schedule/schedule.router";
import priceRouter from "./resources/price/price.router";

const app = express();

const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use('/tour', tourRouter);
app.use('/schedule', scheduleRouter);
app.use('/price', priceRouter);

export default app;