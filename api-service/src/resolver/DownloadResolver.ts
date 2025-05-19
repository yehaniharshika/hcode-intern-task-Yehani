import { Resolver, Query, Arg } from 'type-graphql';
import fs from 'fs/promises';
import path from 'path';
import Redis from 'ioredis';

const redisClient = new Redis({ host: 'localhost', port: 6380 });

@Resolver()
export class DownloadResolver {
  @Query(() => String)
  async downloadVehicleCSV(@Arg('jobId') jobId: string): Promise<string> {
    const fileName = await redisClient.get(`vehicle_export_result:${jobId}`);

    if (!fileName) {
      throw new Error('File not found or export not complete');
    }

    const filePath = path.join(__dirname, `../../exports/${fileName}`);

    try {
      const fileBuffer = await fs.readFile(filePath);
      return fileBuffer.toString('base64'); // Base64 encode
    } catch (error) {
      throw new Error('Error reading file');
    }
  }
}
