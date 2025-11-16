// /* Bước 1: Phương thức createStore nhận 2 tham số: reducer và preloadedState */
// const createStore = (reducer, preloadedState) => {
//   /*   Bước 2: Khi khởi tạo store (tức là gọi hàm này) => gọi reducer() để tạo state bao đầu */
//   let state = reducer(preloadedState, {
//     type: "@@redux/INITj.l.z.h.t.o",
//   });

//   // Khởi tạo mảng listeners (vì có thể có nhiều listener được đăng kí khi dispatch)
//   const listeners = [];

//   // Phương thức createStore trả ra một object có 3 phương thức con bên trong
//   return {
//     /* Bước 3: Phương thức để lấy ra state hiện tại */
//     getState() {
//       return state;
//     },

//     /* Bước 4: Phương thức để bắn đi một hành động cho reducer xử lý */
//     dispatch(action) {
//       // 1. Gọi reducer với state hiện tại và action => sau đó gán đè (cập nhật) state
//       state = reducer(state, action);

//       /* Bước 7: State mới đã được cập nhật => thông báo cho các listeners => thực hiện các listener */
//       listeners.forEach((listener) => listener());
//     },

//     /* Bước 5: Phương thức để ĐĂNG KÝ listener (listener: Một hàm để thực hiện hành động khi state mới được cập nhật):
//         - Mục tiêu: Biết được có đang có bao nhiêu listener được đăng ký
//     */
//     subscribe(listener) {
//       listeners.push(listener);

//       /* Bước 6: Phương thức này trả về một hàm unsubscribe để huỷ đăng ký */
//       // Gỡ listener đó khỏi mảng listeners
//       return () => {
//         const index = listeners.indexOf(listener);
//         listeners.splice(index, 1);
//       };
//     },
//   };
// };

// export default createStore;

const createStore = (reducer, preloadedState) => {
  let state = reducer(preloadedState, {
    type: "@@redux/INITj.l.z.h.t.o",
  });
  const listeners = [];

  return {
    getState() {
      return state;
    },

    dispatch(action) {
      state = reducer(state, action);

      listeners.forEach((listener) => listener());
    },

    subscribe(listener) {
      listeners.push(listener);
      return () => {
        const index = listeners.indexOf(listener);
        listeners.splice(index, 1);
      };
    },
  };
};

export default createStore;
