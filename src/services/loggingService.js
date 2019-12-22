import * as Sentry from '@sentry/browser';

function init() {
  Sentry.init({ dsn: "https://47b096ba6b4648a4941c7e469b541b6f@sentry.io/1864308" });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
}