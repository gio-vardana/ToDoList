import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todoList",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      state.push({ text: action.payload, done: false });
    },
    toggleTodo: (state, action) => {
      const todo = state[action.payload];
      if (todo) {
        todo.done = !todo.done;
      }
    },
    deleteTodo: (state, action) => {
      return state.filter((_, index) => index !== action.payload);
    },
    editTodo: (state, action) => {
      const { index, newText } = action.payload;
      if (state[index]) {
        state[index].text = newText;
      }
    },
  },
});

export const { addTodo, toggleTodo, deleteTodo, editTodo } = todoSlice.actions;
export default todoSlice.reducer;
