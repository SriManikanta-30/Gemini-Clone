import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx"; // Ensure App.jsx exists
import "./index.css"; // If you have global styles
import ContextProvider from "./context/Context.jsx"; // Ensure Context.jsx exists

ReactDOM.createRoot(document.getElementById("root")).render(
  <ContextProvider>
    <App />
  </ContextProvider>
);
