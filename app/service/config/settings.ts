const settings = {
  dev: {
    url: process.env.DEV_URL,
  },
  production: {
    url: process.env.BASE_URL,
  },
};

const getCurrentSettings = () => {
  // if (__DEV__) {
  //   return settings.dev;
  // }
  return settings.production;
};

export default getCurrentSettings();
