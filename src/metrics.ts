// src/metrics.ts
import client from 'prom-client';
import express from 'express';

const collectDefaultMetrics = client.collectDefaultMetrics;
collectDefaultMetrics(); // Collecte CPU, mémoire, etc.

const Registry = client.register;

const metricsRouter = express.Router();

metricsRouter.get('/metrics', async (_req, res) => {
  res.set('Content-Type', Registry.contentType);
  res.end(await Registry.metrics());
});

export default metricsRouter;
