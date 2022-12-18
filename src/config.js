export const Config = {
  cmsUrl: process.env.API_URL_ITEMS,

  dbHost: process.env.DB_HOST,
  dbUser: process.env.DB_USER,
  dbPassword: process.env.DB_PASSWORD,
  dbName: process.env.DB_NAME,

  jwtSecret: process.env.ZEROCHASS_SECRET,

  awsRegion: process.env.AWS_REGION,
  awsBucket: process.env.AWS_BUCKET,

  twitterApiKey: process.env.TWITTER_API_KEY,
};
