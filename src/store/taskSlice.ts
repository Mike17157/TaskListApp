// This file defines the Redux slice for managing tasks and categories.
// It includes the initial state, reducers, and actions for adding/removing tasks and categories,
// as well as selecting a category. This slice is a part of the Redux store and is used to manage
// the state of tasks and categories across the application.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface Task {
  id: number
  text: string
  category: string
}

interface TaskState {
  categories: string[]
  tasks: Task[]
  selectedCategory: string
}

const initialState: TaskState = {
  categories: ["Work", "Personal", "Shopping"],
  tasks: [
    { id: 1, text: "Complete project", category: "Work" },
    { id: 2, text: "Buy groceries", category: "Shopping" },
    { id: 3, text: "Go to the gym", category: "Personal" },
  ],
  selectedCategory: "Work",
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    addTask: (state, action: PayloadAction<{ text: string }>) => {
      const newTask: Task = {
        id: state.tasks.length + 1,
        text: action.payload.text,
        category: state.selectedCategory,
      }
      state.tasks.push(newTask)
    },
    removeTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload)
    },
    addCategory: (state, action: PayloadAction<string>) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter((c) => c !== action.payload)
      state.tasks = state.tasks.filter((task) => task.category !== action.payload)
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = state.categories[0] || ""
      }
    },
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload
    },
  },
})

export const { addTask, removeTask, addCategory, removeCategory, selectCategory } = taskSlice.actions
export default taskSlice.reducer