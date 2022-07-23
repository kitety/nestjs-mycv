const dbConfig = {
  synchronize: false,
  migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migration',
  cli: {
    migrationsDir: __dirname + 'src/migrations',
  },
};

switch (process.env.NODE_ENV) {
  case 'development':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'db.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrationsRun: true,
    });
    break;
  case 'test':
    Object.assign(dbConfig, {
      type: 'sqlite',
      database: 'test.sqlite',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    });
    break;
  case 'production':
    Object.assign(dbConfig, {
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      migrationsRun: true,
      // heroku only
      ssl: { rejectUnauthorized: false },
    });
    break;

  default:
    throw new Error('unknown environment');
}
console.log({ dbConfig });
// module.exports = dbConfig;
export = dbConfig;
// export const t = new DataSource(dbConfig);
