"use client"

import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { addTask, removeTask, addCategory, removeCategory, selectCategory, setTasks } from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryList } from "./components/CategoryList"
import { TaskList } from "./components/TaskList"
import { v4 as uuidv4 } from 'uuid'; // Add this import at the top

interface Task {
  id: string
  text: string
  category: string
}

export function TaskPage() {
  const dispatch: AppDispatch = useDispatch()
  const { categories, selectedCategory, tasks } = useSelector((state: RootState) => state.task)
  const [newTask, setNewTask] = useState<string>("")
  const [newCategory, setNewCategory] = useState<string>("")
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false)

  useEffect(() => {
    const fetchTasks = async () => {
      const response = await fetch(`/api/tasks?category=${selectedCategory}`);
      const data = await response.json();
      dispatch(setTasks(data));
    };
    fetchTasks();
  }, [selectedCategory, dispatch]);

  const handleAddTask = async () => {
    if (newTask.trim() !== "") {
      const newTaskItem = {
        text: newTask,
        category: selectedCategory
      };

      try {
        const response = await fetch('/api/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newTaskItem),
        });

        if (response.ok) {
          const addedTask = await response.json();
          dispatch(addTask(addedTask));
          setNewTask("");
        } else {
          const errorData = await response.json();
          console.error('Failed to add task:', errorData.error, errorData.details);
          // You might want to show an error message to the user here
        }
      } catch (error) {
        console.error('Error adding task:', error);
        // You might want to show an error message to the user here
      }
    }
  };

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
              onKeyDown={(e) => { // Changed from onKeyPress to onKeyDown
                if (e.key === 'Enter') {
                  isEditingCategories ? handleAddCategory() : handleAddTask();
                }
              }}
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