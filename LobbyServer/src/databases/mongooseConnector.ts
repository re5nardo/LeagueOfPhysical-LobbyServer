
import mongoose from 'mongoose';
import { NODE_ENV } from '@config';
import { dbConnection } from '@databases/index';

export default async () => {
    if (NODE_ENV !== 'production') {
        mongoose.set('debug', true);
    }
    
    await mongoose.connect(dbConnection.url, dbConnection.options);
};
