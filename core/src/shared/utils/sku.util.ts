import { Injectable } from '@nestjs/common';

@Injectable()
export class SKUUtil {
  cartesian<T>(...arrays: T[][]): T[][] {
    return arrays.reduce(
      (a, b) => a.flatMap((d) => b.map((e) => [...d, e])),
      [[]],
    );
  }
}
