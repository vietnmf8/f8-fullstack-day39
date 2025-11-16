import React from "react";
import { useDispatch, useSelector } from "react-redux";

/* 
 Redux:
- useSelector(selector): Lấy state qua selector: Bản chất tương tự như getState
  - Selector ở đây là một hàm. Hàm này có tham số là state => state này chính là state trong store, chính là initialState
  - Hàm selector return ra cái gì, thì state sẽ nhận được cái đó, nếu không return thì state sẽ là undefined
  - Chúng ta không nên (state) => state [ Tức là không nên: nhận state -> rồi trả ra state ]:
  Vì nếu sau này ở một nơi khác, mà set lại bất cứ state gì component đều bị re-render lại

  TÓM LẠI :
  - useSelector() so sánh [kết quả trả về] của selector bằng === (shallow equal) mỗi lần state thay đổi.
  VD: trả về state.count thì sẽ so sánh state.count thay vì so sánh state
      - Nếu kết quả mới khác kết quả cũ, component re-render
      - Nếu giống nhau, component KHÔNG re-render
  
  - useSelector so sánh kết quả selector bằng ===
      - Nếu selector trả về primitive → so sánh giá trị
      - Nếu selector trả về object → so sánh reference

  - Mối liên hệ với reducer:
    - Nếu trong reducer mà chỉ return state (vẫn object tham chiếu đó)
    - Đồng thời selector(state => state) (vẫn trả ra object cùng tham chiếu đó)
    => Không re-render

    => reducer luôn cần trả ra object mới.
    - selector(state => state) => gây ra lỗi render không tất cả các comp không cần thiết.
    - selector(state => state.count + 1) => Nếu selector trả về primitive → so sánh giá trị => so sánh giá trị trước và sau. Nếu có thay đổi thì chỉ re-render lại Comp có dùng biến count thôi, còn những state con không đổi thì sẽ không bị re-render
- useStore(): Lấy store
- useDispatch(): Lấy dispatch() => trả về store.dispatch()
*/

/* 
- Muốn lấy ra state => sử dụng useSelector((state) => state.count);
    - Tham số state: state object tổng
    - return về state con (thuộc tính bên trong state tổng)
*/

function Redux() {
    const count = useSelector((state) => state.count);
    console.log(count);

    // const count = store.getState().count; // Mặc dù count có thay đổi nhưng không có subscribe, không có useState, nên không cập nhật ra giao diện

    /* Tại store/index.js => chúng ta tạo store = createStore 
    => chúng ta có thể dùng useStore() để lấy nó ra
    => Hoặc chúng ta có thể import trực tiếp
    */
    // const store2 = useStore(); // Bản chất sử dụng useContext để lấy store từ Provider
    // console.log(store1 === store2); // true

    /* thay vì sử dụng useDispatch => có thể sử dụng store.dispatch()
      - Tại vì dispatch không thể dùng ở một nơi không phải là component vì có sử dụng hook (hook phải được sử dụng trong component)
      => Trong tương lai , giả sử chúng ta ở một nơi không phải component mầ muốn sử dụng dispatch thì phải dùng store.dispatch()
      => Muốn lấy state => store.getState()
    */
    const dispatch = useDispatch();
    return (
        <div>
            <h1>Count is {count}</h1>
            <button onClick={() => dispatch({ type: "increase" })}>
                Increase
            </button>
        </div>
    );
}

export default Redux;
