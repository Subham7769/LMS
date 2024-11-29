// index.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./redux/store";
import AppErrorBoundary from "./components/ErrorBoundary/AppErrorBoundary"; // Import AppErrorBoundary
import "@elastic/charts/dist/theme_light.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <AppErrorBoundary>
      {" "}
      {/* Wrap App in AppErrorBoundary */}
      <App />
    </AppErrorBoundary>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
