
import { createClient } from 'redis';
import { cacheConnection } from '@caches/index';

export const redisClient = createClient({
    url: cacheConnection.url,
});

export async function load(): Promise<void> {
    try {
        redisClient.on('error', (err) => console.log('Redis Client Error', err));
        return await redisClient.connect();
    } catch (error) {
        return Promise.reject(error);
    }
};
