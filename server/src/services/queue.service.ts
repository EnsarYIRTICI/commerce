import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class QueueService {
  constructor(@InjectQueue('data_queue') private readonly dataQueue: Queue) {}

  async addToQueue(data: any) {
    await this.dataQueue.add('process_data', data);
    console.log('Görev kuyruğa eklendi:', data);
  }
}
