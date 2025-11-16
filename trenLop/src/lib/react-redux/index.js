import { useState, useEffect, useContext, useMemo } from "react";
import Provider from "./Provider";
import Context from "./Context";

export const useDispatch = () => {
    const store = useStore();
    return store.dispatch;
};

/* Mục tiêu phải truyền store và dùng useContext để lấy: 
- Ràng buộc: Tức là chỉ dùng các hook này ở trong Provider của nó thôi
*/
export const useStore = () => {
    const store = useContext(Context);
    // Kiểm tra xem có lấy đúng store được truyền từ Provider không?
    // Nếu không bọc ứng dụng bằng Provider thì sẽ không có store
    //
    if (store === undefined) {
        throw new Error`could not file react-redux context...`();
    }
    return store;
};

/* custom hook: useSelector:
- Nó có thể hiện ra UI và re-render là do sử dụng useState
- 1. Dispatch action (bất kỳ)
- 2. Redux store thay đổi
- 3. TẤT CẢ components có useSelector đều chạy selector()
- 4. So sánh kết quả → quyết định re-render hay không
*/
export const useSelector = (selector) => {
    /* Vẫn muốn hiển thị ra UI mà không dùng useSelector */
    const store = useStore();
    const initialState = useMemo(() => store.getState(), [store]);
    const initialValue = selector(initialState);
    const [value, setValue] = useState(initialValue);

    // Ngăn chặn nhận state trả ra state
    // Kiểm tra bằng ===
    useEffect(() => {
        if (initialValue === store.getState()) {
            console.warn(
                `Không trả ra chính state, sẽ làm re-render không cần thiết`
            );
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // gọi 1 lần duy nhất để cảnh báo

    /* Subscribe Lắng nghe sự kiện, dùng ở Side Effect */
    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            const newState = store.getState();

            // Xử lý trường hợp ở reducer khi trả ra state có tham chiếu cũ
            if (initialState === newState) return;

            const newValue = selector(newState);

            // Bước so sánh để tránh bị render nhiều lần
            // Nguyên nhân: Khi bạn dispatch action, CẢ 2 components Counter và Random đều có useSelector, nên:
            if (value !== newValue) {
                console.log(newValue);
                setValue(newValue);
            }
        });

        return unsubscribe;
    }, [value, selector, store, initialState]);

    return value;
};

export { Provider };
