/**
 * Environment Configuration
 *
 * Toggle between development and production environments
 */

type Environment = 'development' | 'production';

// Change this to 'production' when deploying
const ENVIRONMENT = 'development' as Environment;

const config: Record<Environment, { API_BASE_URL: string; BASE_URL: string }> = {
  development: {
    API_BASE_URL: 'http://localhost:8000/api',
    BASE_URL: 'http://localhost:8000',
  },
  production: {
    API_BASE_URL: 'http://103.103.23.174/api',
    BASE_URL: 'http://103.103.23.174',
  },
};

export const ENV = config[ENVIRONMENT];
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';
