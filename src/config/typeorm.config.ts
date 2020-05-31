import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    database: 'webmobile',
    username: 'root',
    password: 'root',
    entities: [__dirname + '/../**/*.entity.{js, ts}'], // caso não coloque {js, ts} não funciona!!!
    synchronize: true,
    logging: false
};
