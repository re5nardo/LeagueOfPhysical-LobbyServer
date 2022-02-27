
import { createClient, RedisClientType } from 'redis';
type RedisType = RedisClientType<Record<string, any>, Record<string, any>>;

class RedisClient {
    private _client: RedisType;
  
    public get client(): RedisType {
        return this._client;
    }
    
    private set client(value: RedisType) {
        this._client = value;
    }

    public async initialize(): Promise<void> {
        this.client = createClient();
        this.client.on('error', (err) => console.log('Redis Client Error', err));
        await this.client.connect();
    }
}

export default new RedisClient();
