import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FORM_ERROR,
  SET_FORM_INPUT,
} from "./constants";

const initialState = {
  todos: [],
  form: {
    inputValue: "",
    error: null,
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    /* Thêm Todo */
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.payload],
        form: {
          // Reset form
          inputValue: "",
          error: null,
        },
      };

    /* Sửa Todo */
    case EDIT_TODO:
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.payload.id
            ? { ...todo, text: action.payload.text }
            : todo,
        ),
      };

    /* Xoá Todo */
    case DELETE_TODO:
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload),
      };

    /* Set input value */
    case SET_FORM_INPUT:
      return {
        ...state,
        form: {
          ...state.form,
          inputValue: action.payload,
        },
      };

    /* Hiển thị lỗi */
    case SET_FORM_ERROR:
      return {
        ...state,
        form: {
          ...state.form,
          error: action.payload,
        },
      };

    default:
      return state;
  }
};

export default reducer;
