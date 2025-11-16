Cách `useSelector` THỰC SỰ hoạt động:
`useSelector` chỉ so sánh **KẾT QUẢ TRẢ VỀ** của hàm selector

```js
const count = useSelector((state) => state.count);
// selector return ra state.count
```

VD:

```js
// Redux Store
const store = {
    count: 5,
    user: { name: "An" },
    todos: [],
};

// Component
function Counter() {
    const count = useSelector((state) => state.count);
    //                                    ^^^^^^^^^^^
    //                                    Trả về: 5
    return <div>{count}</div>;
}
```

# Phân tích TỪNG BƯỚC khi dispatch action:

-   Bước 1: Dispatch action

```js
dispatch({ type: "UPDATE_USER", payload: "Bình" });
```

-   Bước 2: Redux store update

```js
// Store CŨ:
oldStore = { count: 5, user: { name: "An" }, todos: [] };

// Store MỚI:
newStore = { count: 5, user: { name: "Bình" }, todos: [] };
```

-   Bước 3: useSelector được trigger
    **Tất cả components có useSelector** đều gọi hàm selector()

```jsx
// Component Counter:
const count = useSelector((state) => state.count);

// useSelector làm gì:
// 1. Chạy selector với store CŨ
oldResult = oldStore.count; // = 5

// 2. Chạy selector với store MỚI
newResult = newStore.count; // = 5

// 3. So sánh KẾT QUẢ (KHÔNG phải so sánh store!)
oldResult === newResult;
5 === 5; // true

// 4. Kết luận: KHÔNG re-render!
```

=> Dùng so sánh === để so sánh giữa các KẾT QUẢ ĐƯỢC TRẢ RA

VD2:

```jsx
// Redux Store
const store = {
    count: 0,
    user: { name: "An" },
};

// Component 1
function Counter() {
    console.log("Counter chạy");
    const count = useSelector((state) => state.count);
    //                                    ^^^^^^^^^^^
    //                                    Trả về: count (number)
    return <div>{count}</div>;
}

// Component 2
function UserProfile() {
    console.log("UserProfile chạy");
    const user = useSelector((state) => state.user);
    //                                   ^^^^^^^^^^
    //                                   Trả về: user (object)
    return <div>{user.name}</div>;
}
```

**Scenario 1: Dispatch UPDATE_USER:**

```jsx
dispatch({ type: "UPDATE_USER", payload: { name: "Bình" } });

// Store thay đổi:
// count: 0 → 0 (KHÔNG ĐỔI)
// user: { name: "An" } → { name: "Bình" } (ĐỔI)
```

-   Component Counter:

```jsx
// useSelector chạy:
oldResult = 0;
newResult = 0;

0 === 0; // true → KHÔNG re-render
// Console KHÔNG in "Counter chạy"
```

-   Component UserProfile::

```jsx
// useSelector chạy:
oldResult = { name: "An" };
newResult = { name: "Bình" };

// So sánh object reference:
oldResult === newResult; // false → RE-RENDER!
// Console in "UserProfile chạy"
```

=> Kết quả: Chỉ UserProfile re-render, Counter KHÔNG re-render!

**Scenario 2: Dispatch INCREMENT_COUNT**

```jsx
dispatch({ type: "INCREMENT_COUNT" });

// Store thay đổi:
// count: 0 → 1 (ĐỔI)
// user: { name: "An" } → { name: "An" } (KHÔNG ĐỔI - cùng object reference)
```

-   Component Counter:

```jsx
// useSelector chạy:
oldResult = 0;
newResult = 1;

0 === 1; // false → RE-RENDER!
// Console in "Counter chạy"
```

-   Component UserProfile:

```jsx
// useSelector chạy:
oldResult = { name: "An" }; // Object A
newResult = { name: "An" }; // Vẫn là Object A (reducer không tạo object mới)

oldResult === newResult; // true → KHÔNG re-render
// Console KHÔNG in "UserProfile chạy"
```

Kết quả: Chỉ Counter re-render, UserProfile KHÔNG re-render!

# MẤU CHỐT

-   `useSelector` CHỈ QUAN TÂM:

    -   ? **Kết quả trả về** của hàm selector(), ví dụ như `state.count` có thay đổi không?
    -   Sau đó so sánh giá trị `oldResult` === `newResult`
        -   Nếu `false` => re-render Component cần biến sử dụng useSelector đó
        -   Nếu `true` => không re-render

# SO SÁNH

-   Cách 1: `(state) => state`

```jsx
const state = useSelector((state) => state);

// Dispatch BẤT KỲ action nào:
dispatch({ type: "UPDATE_USER" });

// useSelector so sánh:
oldResult = { count: 0, user: { name: "An" } }; // Object A
newResult = { count: 0, user: { name: "Bình" } }; // Object B (mới)

oldResult === newResult; // false → RE-RENDER!
// Vì Redux tạo object state mới sau mỗi action
```

-   Cách 2: `(state) => state.count`

```jsx
const count = useSelector((state) => state.count);

// Dispatch action không liên quan:
dispatch({ type: "UPDATE_USER" });

// useSelector so sánh:
oldResult = 0;
newResult = 0;

0 === 0; // true → KHÔNG re-render!
// Vì count không đổi
```

---

## 💡 Tóm tắt:

| Điều                                             | Đúng/Sai                    |
| ------------------------------------------------ | --------------------------- |
| useSelector so sánh toàn bộ state                | ❌ SAI                      |
| useSelector so sánh từng thuộc tính trong state  | ❌ SAI                      |
| useSelector so sánh KẾT QUẢ trả về của selector  | ✅ ĐÚNG                     |
| useSelector dùng `===` để so sánh                | ✅ ĐÚNG (mặc định)          |
| State con nào đổi thì re-render component cần nó | ✅ ĐÚNG (nếu selector đúng) |

---

## 🎯 Công thức đơn giản:

```
useSelector chỉ quan tâm:
selector(oldState) === selector(newState) ?
    → true: KHÔNG re-render
    → false: RE-RENDER
```
