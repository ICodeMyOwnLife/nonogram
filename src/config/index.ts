import devConfig from './config.dev';
import productionConfig from './config.production';

const config =
  process.env.NODE_ENV === 'production' ? productionConfig : devConfig;

export default config;
