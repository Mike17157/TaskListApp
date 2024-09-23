// This file defines the Redux slice for managing tasks and categories.
// It includes the initial state, reducers, and actions for adding/removing tasks and categories,
// as well as selecting a category. This slice is a part of the Redux store and is used to manage
// the state of tasks and categories across the application.

import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"

interface Category {
  id: string
  name: string
}

interface Task {
  id: string
  text: string
  category: string
}

interface TaskState {
  tasks: Task[]
  categories: Category[]
  selectedCategory: string
  status: 'idle' | 'loading' | 'succeeded' | 'failed'
  error: string | null
}

const initialState: TaskState = {
  tasks: [],
  categories: [],
  selectedCategory: '',
  status: 'idle',
  error: null
}

export const fetchCategories = createAsyncThunk(
  'task/fetchCategories',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('/api/categories');
      if (!response.ok) {
        throw new Error('Failed to fetch categories');
      }
      return response.json();
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  'task/fetchTasks',
  async (category: string) => {
    const response = await fetch(`/api/tasks?category=${category}`);
    return response.json();
  }
);

export const addTaskAsync = createAsyncThunk(
  'task/addTask',
  async (newTask: { text: string; category: string }) => {
    const response = await fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newTask),
    });
    return response.json();
  }
);

export const removeTaskAsync = createAsyncThunk(
  'task/removeTask',
  async (taskId: string) => {
    await fetch('/api/tasks', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: taskId }),
    });
    return taskId;
  }
);

export const addCategoryAsync = createAsyncThunk(
  'task/addCategory',
  async (name: string) => {
    const response = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });
    return response.json();
  }
);

export const removeCategoryAsync = createAsyncThunk(
  'task/removeCategory',
  async (categoryId: string) => {
    await fetch('/api/categories', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: categoryId }),
    });
    return categoryId;
  }
);

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    selectCategory: (state, action: PayloadAction<string>) => {
      state.selectedCategory = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
        state.status = 'succeeded';
      })
      .addCase(fetchCategories.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.tasks = action.payload;
        state.status = 'succeeded';
      })
      .addCase(addTaskAsync.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(removeTaskAsync.fulfilled, (state, action) => {
        state.tasks = state.tasks.filter(task => task.id !== action.payload);
      })
      .addCase(addCategoryAsync.fulfilled, (state, action) => {
        state.categories.push(action.payload);
      })
      .addCase(removeCategoryAsync.fulfilled, (state, action) => {
        const removedCategoryId = action.payload;
        state.categories = state.categories.filter(category => category.id !== removedCategoryId);
        state.tasks = state.tasks.filter(task => task.category !== removedCategoryId);
        if (state.selectedCategory === removedCategoryId) {
          state.selectedCategory = '';
        }
      });
  },
})

export const { selectCategory } = taskSlice.actions

export default taskSlice.reducer