import { Request, Response, NextFunction } from 'express';
import { HttpStatus, RequestMethod } from '@nestjs/common';

export function corsMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  if (req.headers.origin) {
    res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  }
  if (req.method === RequestMethod[RequestMethod.OPTIONS]) {
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Content-Type, Authorization, Origin',
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    res.status(HttpStatus.OK).end();
  }
  next();
}
