import { Module, Global } from '@nestjs/common';
import { MongoClient } from 'mongodb';
import { MongooseModule } from '@nestjs/mongoose';

@Global()
@Module({
    imports: [
        MongooseModule.forRoot('mongodb://localhost:27017/', {
            user: '',
            pass: '',
            dbName: 'ikualo'
        }),
    ],
    providers: [
        /* {
            provide: 'MONGO',
            useFactory: async () => {
                const uri =
                    `mongodb://localhost:27017/`;
                const client = new MongoClient(uri);
                await client.connect();
                const database = client.db('ikualo');
                return database;
            },
        }, */
    ],
    exports: [MongooseModule],
})
export class DatabaseModule { }