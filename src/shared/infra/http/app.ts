import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import swaggerUi from 'swagger-ui-express';

import 'reflect-metadata';

import { router } from '@shared/infra/http/routes';
import swaggerJson from '../../../swagger.json';

import createConnection from '@shared/infra/typeorm';

import '@shared/container';

import { AppError } from '@shared/errors/AppError';
import upload from '@config/upload';

// Caso sem docker utilizar "localhost" como parâmetro da função abaixo
createConnection();

const app = express();
app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerJson));

// Cria uma espécie de "alias" pra acessar os arquivos localmente
app.use("/avatar", express.static(`${upload.tmpFolder}/avatar`))
app.use("/cars", express.static(`${upload.tmpFolder}/cars`))

app.use(router);

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
