const defaultConfig = {
  env: process.env.NODE_ENV,
  port: process.env.PORT || 5000,
  database: {
    host: process.env.DATABASE_HOST,
    database: process.env.DATABASE_NAME,
    username: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASS,
    dialect: 'mssql',
    logging: process.env.DATABASE_LOGGING === 'true',
    timezone: '+07:00',
  },
};

export default defaultConfig;
