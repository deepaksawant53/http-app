import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import * as Sentry from '@sentry/browser';
import "./index.css";
import "bootstrap/dist/css/bootstrap.css";

Sentry.init({ dsn: "https://47b096ba6b4648a4941c7e469b541b6f@sentry.io/1864308" });

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
