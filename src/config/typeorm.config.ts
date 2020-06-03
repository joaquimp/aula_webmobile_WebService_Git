import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mysql',
    url: process.env.JAWSDB_URL || 'mysql://root:@localhost:3306/webmobile',
    entities: [__dirname + '/../**/*.entity.{js, ts}'], // caso não coloque {js, ts} não funciona!!!
    synchronize: true,
    logging: false
};
