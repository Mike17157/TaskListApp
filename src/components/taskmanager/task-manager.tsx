"use client"

import { useState } from "react"
import { useSelector, useDispatch } from "react-redux"
import { RootState, AppDispatch } from "@/store"
import { addTask, removeTask, addCategory, removeCategory, selectCategory } from "@/store/taskSlice"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CategoryList } from "./components/CategoryList"
import { TaskList } from "./components/TaskList"

export function TaskManagerComponent() {
  const dispatch: AppDispatch = useDispatch()
  const { categories, tasks, selectedCategory } = useSelector((state: RootState) => state.task)
  const [newTask, setNewTask] = useState<string>("")
  const [newCategory, setNewCategory] = useState<string>("")
  const [isEditingCategories, setIsEditingCategories] = useState<boolean>(false)

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
          onRemoveTask={(taskId) => dispatch(removeTask(taskId))}
        />

        <div className="p-4 bg-white border-t">
          <div className="flex space-x-2">
            <Input
              type="text"
              placeholder={isEditingCategories ? "Add a new category" : "Add a new task"}
              value={isEditingCategories ? newCategory : newTask}
              onChange={(e) => isEditingCategories ? setNewCategory(e.target.value) : setNewTask(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  isEditingCategories ? handleAddCategory() : handleAddTask()
                }
              }}
            />
            <Button onClick={isEditingCategories ? handleAddCategory : handleAddTask}>
              {isEditingCategories ? "Add Category" : "Add Task"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}