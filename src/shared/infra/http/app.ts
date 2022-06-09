import cors from 'cors';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';
import rateLimiter from './middlewares/rateLimiter';

import * as Sentry from "@sentry/node";
import * as Tracing from "@sentry/tracing";

import 'reflect-metadata';

import { router } from '@shared/infra/http/routes';
import swaggerJson from '../../../swagger.json';

import createConnection from '@shared/infra/typeorm';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';

import dotenv from 'dotenv';
dotenv.config();

// Caso sem docker utilizar "localhost" como parâmetro da função abaixo
createConnection();

const app = express();

// rate limiter
app.use(rateLimiter);

// sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  integrations: [
    new Sentry.Integrations.Http({ tracing: true }),
    new Tracing.Integrations.Express({ app }),
  ],

  tracesSampleRate: 1.0,
});

app.use(express.json());

app.use(Sentry.Handlers.requestHandler());
app.use(Sentry.Handlers.tracingHandler());


app.use(cors());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Cria uma espécie de "alias" pra acessar os arquivos localmente
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

// todas as rotas
app.use(router);


// captura de erros via sentry
app.use(Sentry.Handlers.errorHandler());

// tratativa de erros da aplicação
app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response
        .status(err.statusCode)
        .json({ status: err.statusCode, message: err.message });
    }

    return response.status(500).json({
      status: 'error',
      message: `Internal server error - ${err.message}`,
    });
  }
);

export { app };
