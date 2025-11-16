import { useContext, useEffect, useMemo, useState } from "react";
import Context from "./Context";

// /* Bước 3: Nhận store từ Context:
// - Tại main chúng ta bọc ứng dụng với Provider vào truyền store từ redux
// - Sau đó chúng ta nhận lại store đó từ Context
// => Ràng buộc: Bắt buộc chúng ta phải lấy store từ Context của Redux
// */
// export const useStore = () => {
//   const store = useContext(Context);

//   // 1. Kiểm tra: có lấy đúng store từ Context không?
//   if (store === undefined) {
//     throw new Error(
//       '"Could not find react-redux context value; please ensure the component is wrapped in a',
//     );
//   }

//   // 2. Trả ra store
//   return store;
// };

// /* Bước 4: useDispatch: Lấy ra phương thức dispatch(action) */
// export const useDispatch = () => {
//   // 1. Lấy ra store
//   const store = useStore();

//   // 2. Kiểm tra: có lấy đúng store từ Context không?
//   if (store === undefined) {
//     throw new Error(
//       '"Could not find react-redux context value; please ensure the component is wrapped in a',
//     );
//   }

//   // 3. Trả ra phương thức dispatch(action)
//   return store.dispatch;
// };

// /* Bước 5: useSelector: Tương tự như store.getState() để lấy ra state nhưng thông qua Selector:
// ƯU ĐIỂM: Hiển thị ra UI vì có sử dụng hook useState
// - Nguyên lý hoạt động:
// 1. Dispatch action (bất kỳ)
// 2. Reducer chạy => Cập nhật state mới
// 4. TẤT CẢ components có useSelector đều chạy selector()
// 5. So sánh kết quả giữa selector trước và sau → quyết định re-render hay không
// ? So sánh thế nào:
// - Nếu selector là kiểu nguyên thuỷ => so sánh nguyên thuỷ
// - Nếu selector là kiểu object => so sánh object
// */

// /* Phương thức này nhận vào tham số là một hàm có tên là selector (VD: state => state.count)
// - Hàm này nhận vào tham số là state tổng
// - Trả ra state con hiện tại
// */

// export const useSelector = (callback) => {
//   // 1. Lấy ra store
//   const store = useStore();

//   // 2. Lấy state ban đầu (state tổng)
//   // Vì useSelector có thể được gọi lại sau mỗi lần dispatch => dẫn đến không bảo lưu được state ban đầu => sử dụng useMemo để cache với deps = store (vì store luôn không thay đổi)
//   // Mục đích: Để kiểm tra xem reducer có đang return object mới hay vẫn object với tham chiếu cũ

//   const initialState = useMemo(() => store.getState(), [store]);

//   // 3. Lấy giá trị selector khởi tạo
//   const initialSelector = callback(initialState);

//   // 4. Lấy ra state ban đầu để render ra được UI
//   const [selector, setSelector] = useState(initialSelector);

//   // Ngăn chặn state trả ra state
//   // Mục tiêu: Vì reducer luôn trả ra state mới dưới dạng object (tham chiếu mới) -> Nếu state => state -> so sánh với state ban đầu thấy khác tham chiếu -> luôn bị re-render không cần thiết. Vì vậy chúng ta cần trả ra selector con VD state.count để nó so sánh các kiểu nguyên thuỷ với nhau. Nếu thay đổi thì mới re-render
//   // Logic kiểm tra: Toán tử ===
//   // Kiểm tra 1 lần khi useSelector chạy để cảnh báo
//   // Kiểm tra: Nếu selector ban đầu ==== state tổng
//   useEffect(() => {
//     if (initialSelector === store.getState()) {
//       console.warn(
//         "Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders",
//       );
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   // 5. Vì chúng ta sử dụng dispatch => nên cần đăng ký (subscribe) cho listener biết => thực hiện cập nhật lên UI với setState
//   useEffect(() => {
//     const unsubscribe = store.subscribe(() => {
//       // Lấy ra state tổng mới
//       const newState = store.getState();

//       // Kiểm tra nếu reducer không trả ra state mới
//       if (newState === initialState) return;

//       // Lấy ra selector mới
//       const newSelector = callback(newState);

//       // So sánh kiểu dữ liệu để tránh re-render nhiều lần
//       // Nguyên nhân: Khi bạn dispatch action, CẢ 2 components Counter và Random đều có useSelector, nên:
//       if (selector !== newSelector) {
//         // Cập nhật lên UI
//         setSelector(newSelector);
//       }
//     });

//     // Clean up
//     return unsubscribe;
//   }, [callback, initialState, selector, store]);
// };

/* useStore */
export const useStore = () => {
  const store = useContext(Context);
  if (store === undefined) {
    throw new Error(
      '"Could not find react-redux context value; please ensure the component is wrapped in a',
    );
  }
  return store;
};

/* useDispatch */
export const useDispatch = () => {
  const store = useStore();
  if (store === undefined) {
    throw new Error(
      '"Could not find react-redux context value; please ensure the component is wrapped in a',
    );
  }
  return store.dispatch;
};

/* useSelector */
export const useSelector = (callback) => {
  const store = useStore();
  if (store === undefined) {
    throw new Error(
      '"Could not find react-redux context value; please ensure the component is wrapped in a',
    );
  }
  console.log("--- re-render --------------------------------");
  const initialState = useMemo(() => store.getState(), [store]);
  console.log("State tổng ban đầu: ", initialState);

  const initialSelector = callback(store.getState());
  console.log("Selector hiện tại:", initialSelector);

  const [selector, setSelector] = useState(initialSelector);
  console.log("Biến UI hiện tại: ", selector);

  // 🌻 Cảnh báo nếu selector trả ra chính state
  useEffect(() => {
    if (initialSelector === store.getState()) {
      console.warn(
        "Selector unknown returned a different result when called with the same parameters. This can lead to unnecessary rerenders",
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // 🌻 Cảnh báo nếu reducer không return object mới 
  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const newState = store.getState();

      // console.log
      console.log("---------------------------------------------");
      console.group("Kiểm tra reducer có return state mới không?");
      console.log("State tổng mới: ", newState);
      console.log("State tổng ban đầu: ", initialState);
      console.log(
        "Object cùng tham chiếu đúng không: ",
        newState === initialState,
      );
      console.groupEnd();

      if (newState === initialState)
        throw Error("Tại reducer không nên return state có tham chiếu cũ");

      // Quyết định re-render lại component nào nếu selector thay đổi
      const newSelector = callback(newState);

      // console.log
      console.log("---------------------------------------------");
      console.group("Selector có thay đổi sau dispatch không?");
      console.log("Biến UI hiện tại:", selector);
      console.log("Selector sau khi dispatch:", newSelector);
      console.log(selector !== newSelector);
      console.groupEnd();

      if (selector !== newSelector) {
        setSelector(newSelector);
      }
    });
    return unsubscribe;
  }, [callback, initialState, selector, store]);

  return selector;
};
