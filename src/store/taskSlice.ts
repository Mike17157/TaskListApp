// This file defines the Redux slice for managing tasks and categories.
// It includes the initial state, reducers, and actions for adding/removing tasks and categories,
// as well as selecting a category. This slice is a part of the Redux store and is used to manage
// the state of tasks and categories across the application.

import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { createAsyncThunk } from "@reduxjs/toolkit"

interface Task {
  id: string
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
  tasks: [],
  selectedCategory: "Work",
}

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setTasks: (state, action: PayloadAction<Task[]>) => {
      state.tasks = action.payload;
    },
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks.push(action.payload)
    },
    removeTask: (state, action: PayloadAction<string>) => {
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

export const { setTasks, addTask, removeTask, addCategory, removeCategory, selectCategory } = taskSlice.actions

export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/tasks');

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        return rejectWithValue(error.message);
      }
      return rejectWithValue('An unknown error occurred');
    }
  }
);

// Similar changes for addTask, updateTask, and deleteTask thunks

export default taskSlice.reducer