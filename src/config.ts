import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
    return {
        mongo: {
            dbName: process.env.MONGO_DB,
            user: process.env.MONGO_INITDB_ROOT_USERNAME,
            password: process.env.MONGO_INITDB_ROOT_PASSWORD,
            port: process.env.MONGO_PORT,
            host: process.env.MONGO_HOST,
            connection: process.env.MONGO_CONNECTION,
        },
        apiKey: process.env.API_KEY,
    };
});