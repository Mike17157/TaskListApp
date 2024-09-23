"use client"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import {
  selectCategory,
  fetchCategories,
  fetchTasks,
  addTaskAsync,
  removeTaskAsync,
  addCategoryAsync,
  removeCategoryAsync
} from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryList } from "./components/CategoryList"
import { TaskList } from "./components/TaskList"

export function TaskPage() {
  const dispatch: AppDispatch = useDispatch()
  const { categories, selectedCategory, tasks, status, error } = useSelector((state: RootState) => state.task)
  const [newTask, setNewTask] = useState<string>("")
  const [newCategory, setNewCategory] = useState<string>("")
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false)

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(fetchTasks(selectedCategory));
    }
  }, [selectedCategory, dispatch]);

  const handleAddTask = async () => {
    if (newTask.trim() !== "" && selectedCategory) {
      await dispatch(addTaskAsync({ text: newTask, category: selectedCategory }));
      setNewTask("");
    }
  };

  const handleAddCategory = async () => {
    if (newCategory.trim() !== "") {
      await dispatch(addCategoryAsync(newCategory));
      setNewCategory("");
    }
  }

  const handleRemoveTask = async (taskId: string) => {
    await dispatch(removeTaskAsync(taskId));
  };

  const handleRemoveCategory = async (categoryId: string) => {
    await dispatch(removeCategoryAsync(categoryId));
  };

  const selectedCategoryObject = categories.find(cat => cat.id === selectedCategory) || null;

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategoryObject}
        isEditingCategories={isEditingCategories}
        onSelectCategory={(categoryId) => dispatch(selectCategory(categoryId))}
        onRemoveCategory={handleRemoveCategory}
        onToggleEditCategories={() => setIsEditingCategories(!isEditingCategories)}
      />

      <div className="w-3/4 flex flex-col">
        {tasks.length === 0 && !selectedCategory && (
          <div className="flex-grow flex items-center justify-center text-center p-4">
            <div>
              <h2 className="text-3xl mb-2 text-gray-800 font-cartoony">Welcome to Your Task Manager!</h2>
              <p className="text-gray-700 font-body">
                This application helps you organize your tasks by categories. 
                Start by creating a category, then add tasks to it. 
                You can easily manage your to-dos and stay organized!
              </p>
            </div>
          </div>
        )}
        
        {(tasks.length > 0 || selectedCategory) && (
          <TaskList
            tasks={tasks}
            selectedCategoryName={selectedCategoryObject?.name || 'Error Task'}
            onRemoveTask={handleRemoveTask}
          />
        )}

        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={isEditingCategories ? "Add a new category" : "Add a new task"}
              value={isEditingCategories ? newCategory : newTask}
              onChange={(e) => isEditingCategories ? setNewCategory(e.target.value) : setNewTask(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  isEditingCategories ? handleAddCategory() : handleAddTask();
                }
              }}
              className="flex-grow"
            />
            {isEditingCategories && (
              <Button
                onClick={handleAddCategory}
                variant="default"
                size="default"
              >
                Add Category
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}