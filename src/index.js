import React from "react";
import ReactDOM from "react-dom/client"; // Updated import for React 18+
import "./index.css"; // Ensure this file exists or remove this line
import App from "./App";
import { Provider } from "react-redux";
import store from "./app/store";

// Create the root element for React 18+
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
