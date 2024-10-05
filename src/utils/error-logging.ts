import * as Sentry from '@sentry/nextjs';

export const setSentryLogging = (error: Error) => Sentry.captureException(error);
