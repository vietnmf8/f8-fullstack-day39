/* Bước 2: Tạo Provider để bao bọc toàn ứng dụng và có thể truyền dữ liệu đi */
// Nhận 2 props:
// - children: Bọc toàn bộ ứng dụng

import Context from "./Context";

// - store: Cung cấp store thông qua Context để truyền đi
const Provider = ({ children, store }) => {
  return <Context.Provider value={store}>{children}</Context.Provider>;
};

export default Provider;
