import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

window.addEventListener("scroll", function () {
  let header = document.getElementById("headers");
  if (this.scrollY > 0) {
    header.className =
      "bg-white py-4 shadow-md fixed w-full z-10 lg:px-8 transition-all";
  } else {
    header.className = "bg-none py-6 fixed w-full z-10 lg:px-8 transition-all";
  }
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
