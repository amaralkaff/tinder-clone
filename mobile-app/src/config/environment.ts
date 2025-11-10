/**
 * Environment Configuration
 *
 * Toggle between development and production environments
 */

type Environment = 'development' | 'production';

// Change this to switch environments:
// 'development' = local backend (http://localhost:8000)
// 'production' = VPS with HTTPS (https://amangly.duckdns.org)
const ENVIRONMENT = 'production' as Environment;

const config: Record<Environment, { API_BASE_URL: string; BASE_URL: string }> = {
  development: {
    API_BASE_URL: 'http://localhost:8000/api',
    BASE_URL: 'http://localhost:8000',
  },
  production: {
    API_BASE_URL: 'https://amangly.duckdns.org/api',
    BASE_URL: 'https://amangly.duckdns.org',
  },
};

export const ENV = config[ENVIRONMENT];
export const IS_PRODUCTION = ENVIRONMENT === 'production';
export const IS_DEVELOPMENT = ENVIRONMENT === 'development';
