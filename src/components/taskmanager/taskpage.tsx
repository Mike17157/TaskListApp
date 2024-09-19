"use client"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { addTask, removeTask, addCategory, removeCategory, selectCategory } from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryList } from "./components/CategoryList"
import { TaskList } from "./components/TaskList"

interface Task {
  id: string
  text: string
  category: string
}

export function TaskPage() {
  const dispatch: AppDispatch = useDispatch()
  const { categories, selectedCategory } = useSelector((state: RootState) => state.task)
  const [newTask, setNewTask] = useState<string>("")
  const [newCategory, setNewCategory] = useState<string>("")
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false)
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks?category=${selectedCategory}`);
      const data = await response.json();
      setTasks(data);
    };
    fetchTasks();
  }, [selectedCategory]);

  const handleAddTask = () => {
    if (newTask.trim() !== "") {
      dispatch(addTask({ text: newTask }))
      setNewTask("")
    }
  }

  const handleAddCategory = () => {
    if (newCategory.trim() !== "") {
      dispatch(addCategory(newCategory))
      setNewCategory("")
    }
  }

  const handleRemoveTask = async (taskId: string) => {
    try {
      const response = await fetch('/api/tasks', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: taskId }),
      });

      if (response.ok) {
        // Remove the task from the local state
        setTasks(tasks.filter(task => task.id !== taskId));
        // Dispatch the removeTask action to update Redux store if needed
        dispatch(removeTask(taskId));
      } else {
        console.error('Failed to delete task');
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <CategoryList
        categories={categories}
        selectedCategory={selectedCategory}
        isEditingCategories={isEditingCategories}
        onSelectCategory={(category) => dispatch(selectCategory(category))}
        onRemoveCategory={(category) => dispatch(removeCategory(category))}
        onToggleEditCategories={() => setIsEditingCategories(!isEditingCategories)}
      />

      <div className="w-3/4 flex flex-col">
        <TaskList
          tasks={tasks}
          selectedCategory={selectedCategory}
          onRemoveTask={handleRemoveTask}
        />

        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={isEditingCategories ? "Add a new category" : "Add a new task"}
              value={isEditingCategories ? newCategory : newTask}
              onChange={(e) => isEditingCategories ? setNewCategory(e.target.value) : setNewTask(e.target.value)}
              onEnter={isEditingCategories ? handleAddCategory : handleAddTask}
              isEditing={true}
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