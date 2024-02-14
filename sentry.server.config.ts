// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from "@sentry/nextjs";

import { env } from "@/env.mjs";

if (env.NODE_ENV !== "development") {
  Sentry.init({
    dsn: "https://e9351390f57d66bb500a622c38484d68@o4506314595106816.ingest.sentry.io/4506716077686784",

    // Adjust this value in production, or use tracesSampler for greater control
    tracesSampleRate: 1,

    // Setting this option to true will print useful information to the console while you're setting up Sentry.
    debug: false,
  });
}
