
import { createClient } from 'redis';
import { cacheConnection } from '@caches/index';

export const redisClient = createClient({
    url: cacheConnection.url,
});

export async function load(): Promise<void> {
    redisClient.on('error', (err) => console.log('Redis Client Error', err));
    
    await redisClient.connect();
};
