Chúng ta có thể sử dụng Context API để có global state. Nhưng nhược điểm là không nhất quán quy trình, phong cách, không định nghĩa được quy trình rõ ràng

Redux:

-   Là một quy trình quản lý state:
-   Được sử dụng rộng rãi trong các ứng dụng JS, chứ không phải riêng cho React

-   Quy trình:
    ![Ảnh mèo](https://redux.js.org/assets/images/ReduxDataFlowDiagram-49fa8c3968371d9ef6f2a1486bd40a26.gif)

-   Giải thích từng bước quy trình:

-   **Bước 1: UI hiển thị State hiện tại**

    -   UI (Component React) hiển thị giá trị đang nằm trong Store → State.
        > Ví dụ: hiển thị số tiền hiện tại: **$10**

-   **Bước 2: Người dùng thao tác - Event Handler chạy**

    -   Khi user nhấn nút
        -   Deposit $10
        -   Withdraw $10

    → Một Event Handler (ví dụ `onClick`) được gọi.

-   **Bước 3: Event Handler gọi dispatch()**

    -   Event Handler không tự thay đổi state.
    -   Nó chỉ `dispatch` một `action`.
    -   Ví dụ

        ```js
        dispatch({ type: "deposit", payload: 10 });
        ```

        → `Dispatch` gửi `action` đó vào trong Redux `Store`.

-   **Bước 4: Store nhận action → đưa vào Reducer**

    -   `Store` chuyển `action` vào `Reducer`.
    -   `Reducer` nhận:
        -   `state` **CŨ**
        -   `action`
            > → và trả về `state` **MỚI**.

    **Lưu ý**: Sơ đồ có nhiều R (reducers) nghĩa là có thể nhiều reducers được combine lại.

    -   Ví dụ:

        ```js
        function bankReducer(state, action) {
            switch (action.type) {
                case "deposit":
                    return state + action.payload;
                case "withdraw":
                    return state - action.payload;
                default:
                    return state;
            }
        }
        ```

-   **Bước 5: Reducer trả về State mới → Store cập nhật**

    -   Reducer không được `mutate` (thay đổi) `state` cũ.
    -   Nó **tạo `state` mới** và trả về.
    -   Store nhận **`state` mới** và lưu lại.

-   **Bước 6: UI tự động nhận State mới → re-render**

    -   Khi store thay đổi → UI `subscribe` (via `useSelector()`) sẽ:
        -   nhận state mới
        -   tự động re-render phần cần thiết
        -   UI hiển thị lại, ví dụ từ $10 → $20.

-   **Bước 7: Chu trình lặp lại**
-   UI → Event → Dispatch → Reducer → New State → UI

==================== REACT_REDUX ========================

npm i redux
npm i react-redux: Giúp chúng ta dễ dàng sử dụng Redux trong react:
=> Sử dụng khái niệm Context API để có thể tạo ra global State và truyền dispatch đi khắp mọi nơi:

1. Tạo ra context
2. Tạo ra Provider bọc App
3. Sử dụng useContext để lấy dữ liệu

React-redux:

1. Vai trò: quản lý global state
1. Tạo ra Provider bọc toàn bộ ứng dụng

Bước 1: Tạo `src/store/index.js`:

1. Tạo store
2. Tạo provider
3. Bọc toàn bộ ứng dụng
4. Truyền prop store={store}

5. ? Redux dùng Context API để truyền dữ liệu đi, vậy nó truyền cái gì đi. Nó tạo ra vài customHook để nó truyền đi

-   useSelector(): Lấy state qua selector: Bản chất tương tự như getState
-   useStore(): Lấy store
-   useDispatch(): Lấy dispatch()

Vấn đề khi useSelector(state => state)

1. Các mà useSelector hoạt động:

-   Bước 1: Gọi hàm selector()
-   Bước 2: So sánh kết quả cũ và mới
-   Bước 3: Quyết định có re-render không?

    ```jsx
    // 1. Chạy selector
    const oldResult = selector(oldState); // Lần trước
    const newResult = selector(newState); // Lần này

    // 2. So sánh (mặc định dùng ===)
    if (oldResult === newResult) {
        // KHÔNG re-render
    } else {
        // RE-RENDER!
    }
    ```

2. Tại sao `(state) => state.count` hoạt động?

```js
state = {
    count: 5
    user: {...}
}
```

❌ `(state) => state`:

-   oldResult: { count: 5, user: {...} } (0x01)
-   newResult: { count: 5, user: {...} } (0x02)
    => So sánh state trước === state sau => `false` vì khác tham chiếu => Re-render Component

✅ `(state) => state.count`:
=> So sánh từng property bên trong state

-   oldResult = 5
-   newResult = 5

// So sánh:
5 === 5 => true → KHÔNG re-render! 🎉

-   Nếu lấy ra nhiều state

```js
// ❌ Vấn đề
const data = useSelector((state) => ({
    count: state.count,
    name: state.user.name
}));

// Mỗi lần chạy tạo OBJECT MỚI:
{ count: 5, name: "An" } === { count: 5, name: "An" }  // false!
// → RE-RENDER mãi!
```

=> Cách khắc phục shallowEqual?

```js
// ✅ Giải pháp với shallowEqual
import { shallowEqual } from "react-redux";

const data = useSelector(
    (state) => ({
        count: state.count,
        name: state.user.name,
    }),
    shallowEqual // So sánh từng property bên trong
);

// shallowEqual làm gì?
function shallowEqual(objA, objB) {
    // So sánh từng key:
    objA.count === objB.count; // 5 === 5 ✅
    objA.name === objB.name; // "An" === "An" ✅
    // → Không re-render!
}
```

> Lý do: shallowEqual so sánh nội dung object, không so sánh reference!

-   Tại sao tách thành nhiều selector tốt hơn?

```js
// ✅ Tách ra
const count = useSelector((state) => state.count);
const name = useSelector((state) => state.user.name);

// Khi count thay đổi:
// - useSelector thứ 1: 5 !== 6 → re-render ✅
// - useSelector thứ 2: "An" === "An" → không re-render ✅

// Khi name thay đổi:
// - useSelector thứ 1: 5 === 5 → không re-render ✅
// - useSelector thứ 2: "An" !== "Bình" → re-render ✅
```

> Lý do: Mỗi useSelector theo dõi riêng biệt → tối ưu hơn!

VD Sai:

```jsx
// Redux Store
const store = {
    count: 0,
    todos: [],
    user: { name: "An" },
};

// ❌ Component 1: Subscribe toàn bộ
function BadCounter() {
    console.log("🔴 BadCounter re-render");
    const state = useSelector((state) => state);
    return <div>{state.count}</div>;
}

// ❌ Component 2: Subscribe toàn bộ
function BadTodoList() {
    console.log("🔴 BadTodoList re-render");
    const state = useSelector((state) => state);
    return (
        <ul>
            {state.todos.map((t) => (
                <li key={t.id}>{t.text}</li>
            ))}
        </ul>
    );
}

// ❌ Component 3: Subscribe toàn bộ
function BadUserProfile() {
    console.log("🔴 BadUserProfile re-render");
    const state = useSelector((state) => state);
    return <div>{state.user.name}</div>;
}

function App() {
    return (
        <div>
            <BadCounter />
            <BadTodoList />
            <BadUserProfile />
        </div>
    );
}
```

```js
dispatch({ type: "ADD_TODO", payload: { id: 1, text: "Learn Redux" } });

// Console output:
// 🔴 BadCounter re-render      ← KHÔNG CẦN! (count không đổi)
// 🔴 BadTodoList re-render     ← CẦN! (todos thay đổi)
// 🔴 BadUserProfile re-render  ← KHÔNG CẦN! (user không đổi)
```

✅ Đúng:

```jsx
// ✅ Mỗi component chỉ lấy cái cần
function GoodCounter() {
    console.log("🟢 GoodCounter re-render");
    const count = useSelector((state) => state.count);
    return <div>{count}</div>;
}

function GoodTodoList() {
    console.log("🟢 GoodTodoList re-render");
    const todos = useSelector((state) => state.todos);
    return (
        <ul>
            {todos.map((t) => (
                <li key={t.id}>{t.text}</li>
            ))}
        </ul>
    );
}

function GoodUserProfile() {
    console.log("🟢 GoodUserProfile re-render");
    const userName = useSelector((state) => state.user.name);
    return <div>{userName}</div>;
}
```

```js
dispatch({ type: 'ADD_TODO', payload: { id: 1, text: 'Learn Redux' } });

// Console output:
// 🟢 GoodTodoList re-render    ← CHỈ CÁI NÀY re-render!
// (2 cái kia KHÔNG re-render)
```
