import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import formidable, { File } from 'formidable';

@Injectable()
export class SkuImageMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const form = new formidable.IncomingForm({
      maxFiles: 1,
      keepExtensions: true,
    });

    form.parse(req, (err, fields, files) => {
      if (err) {
        return res.status(400).send('Error in form data processing');
      }

      const fileKey = Object.keys(files)[0];
      req.file = files[fileKey] as any;

      req.body = JSON.parse(fields.data as unknown as string);

      next();
    });
  }
}
