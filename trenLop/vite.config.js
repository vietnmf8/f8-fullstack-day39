import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

/* Cấu hình path alias */
// https://vite.dev/config/
export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
        alias: {
            // eslint-disable-next-line no-undef
            "@": path.resolve(__dirname, "src"),

            // (__dirname: Lấy  thư mục chạy lệnh npm run dev: chính là root dự án luôn)
            // Sau đó chúng ta nối với src => f8-fullstack-day33/trenLop/src = @
        },
    },
});
