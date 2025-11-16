import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import App from "./App.jsx";
import { Provider as ReduxProvider } from "@/lib/react-redux";
import store from "./store";

createRoot(document.getElementById("root")).render(
    // Bên trong sẽ mặc định nhận prop: store để truyền context đi khắp ứng dụng=> gọi store.getState() => nếu không truyền store sẽ báo lỗi
    <ReduxProvider store={store}>
        <App />
    </ReduxProvider>
);
