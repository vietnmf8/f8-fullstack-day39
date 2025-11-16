import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ReduxProvider } from "./libs/react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <App />
  </ReduxProvider>,
);
