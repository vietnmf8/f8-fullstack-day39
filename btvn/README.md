- npm i react-router prop-types
- npm install tailwindcss @tailwindcss/vite
- npx shadcn@latest init
- npm install -D prettier prettier-plugin-tailwindcss
- npm i vite-plugin-svgr

- `jsconfig.json`

  ```json
  {
    "compilerOptions": {
      "baseUrl": ".",
      "paths": {
        "@/*": ["./src/*"]
      }
    }
  }
  ```

- `vite.config.js`

  ```js
  import { defineConfig } from "vite";
  import react from "@vitejs/plugin-react-swc";
  import path from "path";
  import tailwindcss from "@tailwindcss/vite";

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        // eslint-disable-next-line no-undef
        "@": path.resolve(__dirname, "./src"),
      },
    },
  });
  ```

- `.prettierrc`

  ```json
  {
    "plugins": ["prettier-plugin-tailwindcss"]
  }
  ```
