export abstract class CacheSystem {
  abstract connect(): Promise<void>;
  abstract disconnect(): Promise<void>;
  abstract set(key: string, value: any): Promise<void>;
  abstract get(key: string): Promise<string>;
  abstract del(key: string): Promise<void>;
}
