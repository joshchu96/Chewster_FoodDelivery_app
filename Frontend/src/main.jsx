import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import ChewsterContextProvider from "./context/ChewsterContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChewsterContextProvider>
      <App />
    </ChewsterContextProvider>
  </BrowserRouter>
);
