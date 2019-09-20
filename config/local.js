const localConfig = {
  hostname: 'localhost',
  port: 8080,
  googleClientID: process.env.GOOGLE_CLIENT_ID,
  googleClientSecret: process.env.GOOGLE_CLIENT_SECRET,
  cookieKey: process.env.COOKIE_KEY,
  movieApiKey: process.env.MOVIE_API_KEY,
  logToConsole: true,
};

export default localConfig;
