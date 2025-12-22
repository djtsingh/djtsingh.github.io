import { dev } from '$app/environment';
import { handleErrorWithSentry, init } from '@sentry/sveltekit';
import { PUBLIC_SENTRY_DSN } from '$env/static/public';

// Only initialize Sentry if DSN is configured
if (PUBLIC_SENTRY_DSN && PUBLIC_SENTRY_DSN !== 'https://your-sentry-dsn@sentry.io/project-id') {
  init({
    dsn: PUBLIC_SENTRY_DSN,
    environment: dev ? 'development' : 'production',
    tracesSampleRate: dev ? 1.0 : 0.1,

    // Performance monitoring
    integrations: [],

    // Release tracking
    release: 'daljeetsingh.me@' + (dev ? 'dev' : '1.0.0'),
  });
}

// If you have a custom error handler, pass it to `handleErrorWithSentry`
export const handleError = handleErrorWithSentry();