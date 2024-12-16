import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import formidable from 'formidable';

@Injectable()
export class SkuImageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const form = new formidable.IncomingForm();

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).send('Error in form data processing');
      }

      req.body = JSON.parse(fields.data as unknown as string);
      req.files = files as any;

      // console.log('Middleware Files: ', req.files);
      // console.log('Middleware Body: ', req.body);

      next();
    });
  }
}
