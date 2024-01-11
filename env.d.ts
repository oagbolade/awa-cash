declare global {
  namespace NodeJS {
    interface ProcessEnv {
      APP_ID: string;
      APP_KEY: string;
      BASE_URL: string;
      DEV_URL: string;
      NODE_ENV: 'development' | 'production';
      PORT?: string;
      PWD: string;
    }
  }
}

export {};
