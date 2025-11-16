const initialState = {
    count: 0,
    random: Math.random(),
    // key 1
    // key 2
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case "increase":
            // Cần trả đúng cấu trúc của initialState:
            // Bảo lưu toàn bộ cái đã có
            // Ghi đè cái cần
            return {
                ...state,
                count: state.count + 1, // Lưu ý không dùng state.count++
            };
        case "random":
            // return {
            //     ...state,
            //     random: Math.random()
            // }
            state.random = Math.random();
            return state;

        default:
            return state;
    }
};

export default reducer;
