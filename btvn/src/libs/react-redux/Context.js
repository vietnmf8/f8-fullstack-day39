/**
 * Thư viện React-Redux dùng Context API để có thể truyền được store đi khắp nơi trong ứng dụng
 */

import { createContext } from "react";

/* Bước 1: Tạo Context */
const Context = createContext();
export default Context;
