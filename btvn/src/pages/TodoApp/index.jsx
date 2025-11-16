import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useDispatch, useSelector } from "@/libs/react-redux";
import {
  ADD_TODO,
  DELETE_TODO,
  EDIT_TODO,
  SET_FORM_ERROR,
  SET_FORM_INPUT,
} from "@/store/constants";
import React, { useRef } from "react";

function TodoApp() {
  /* ==========================================================
   * State
   * ==========================================================*/

  // Lấy ra dispatch
  const dispatch = useDispatch();

  // Lấy danh sách Todos
  const todos = useSelector((state) => state.todos);

  // Lấy giá trị input
  const inputValue = useSelector((state) => state.form.inputValue);

  // Lấy thông báo lỗi
  const error = useSelector((state) => state.form.error);

  // Sử dụng useRef để focus vào ô input
  const inputRef = useRef();

  /* ==========================================================
   * Function
   * ==========================================================*/

  /* Xử lý khi nhấn vào nút Submit */
  const handleSubmit = (e) => {
    e.preventDefault();

    // Loại bỏ khoảng trắng
    const trimmedValue = inputValue.trim();

    // Nếu input rỗng => hiển thị lỗi
    if (!trimmedValue) {
      dispatch({
        type: SET_FORM_ERROR,
        payload: "Please enter a todo item",
      });
      return;
    }

    // Thêm Todo
    dispatch({
      type: ADD_TODO,
      payload: {
        id: Date.now(),
        text: trimmedValue,
      },
    });

    // Focus vào input
    inputRef.current.focus();
  };

  /* Xử lý khi nhấn vào nút Edit */
  const handleEdit = (id, currentText) => {
    const newText = prompt("Enter new todo text:", currentText);
    
    // Xử lý cancel
    if (newText === null) {
      return;
    }

    // Xử lý OK với chuỗi rỗng
    if (!newText.trim()) return;

    dispatch({
      type: EDIT_TODO,
      payload: {
        id: id,
        text: newText.trim(),
      },
    });
  };

  /* Xử lý khi nhấn vào nút Xoá */
  const handleDelete = (id, text) => {
    if (confirm(`Are you sure you want to delete "${text}"?`)) {
      dispatch({
        type: DELETE_TODO,
        payload: id,
      });
    }
  };

  /* ==========================================================
   * JSX
   * ==========================================================*/

  return (
    <div className="mx-auto max-w-xl p-4 md:p-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Todo App
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Form thêm todo */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex w-full items-center gap-2">
              <Input
                ref={inputRef}
                type="text"
                placeholder="Enter your todo..."
                value={inputValue}
                onChange={(e) => {
                  dispatch({
                    type: SET_FORM_INPUT,
                    payload: e.target.value,
                  });
                  // Clear lỗi khi nhập
                  if (error) {
                    dispatch({ type: SET_FORM_ERROR, payload: null });
                  }
                }}
                className="flex-1"
              />
              <Button type="submit">Add Todo</Button>
            </div>
            {/* Hiển thị lỗi */}
            {error && <p className="text-sm text-red-500">{error}</p>}
          </form>

          {/* Danh sách todos  */}
          <div className="mt-6">
            <h2 className="mb-2 text-lg font-semibold">Todo List</h2>
            {/* Kiểm tra nếu todos rỗng */}
            {todos.length === 0 ? (
              // Hiển thị thông báo todos rỗng
              <p className="text-sm text-gray-500">The todo list is empty.</p>
            ) : (
              // Render todos nếu không rỗng
              <ul className="space-y-2">
                {todos.map((todo) => (
                  <li
                    key={todo.id}
                    className="flex items-center justify-between rounded-md border p-3"
                  >
                    {/* Tên Todo */}
                    <span className="flex-1 pr-4 wrap-break-word">
                      {todo.text}
                    </span>
                    {/* Các nút Sửa/Xoá */}
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleEdit(todo.id, todo.text)}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleDelete(todo.id, todo.text)}
                      >
                        Delete
                      </Button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default TodoApp;
