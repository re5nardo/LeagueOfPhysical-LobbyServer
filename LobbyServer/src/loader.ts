
import mongooseConnector from '@databases/mongooseConnector';
import redisClient from '@databases/redisClient';

export default async () => {
    //  mongoose
    await mongooseConnector();

    //  redis
    await redisClient.initialize();
};
