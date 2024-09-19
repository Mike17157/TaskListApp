import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Task {
  id: number
  text: string
  category: string
}

interface TaskListProps {
  tasks: Task[]
  selectedCategory: string
  onRemoveTask: (taskId: number) => void
}

export function TaskList({ tasks, selectedCategory, onRemoveTask }: TaskListProps) {
  return (
    <div className="flex-grow p-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Tasks - {selectedCategory}</h2>
      <ScrollArea className="h-[calc(100vh-12rem)]">
        <ul>
          {tasks
            .filter((task) => task.category === selectedCategory)
            .map((task) => (
              <li key={task.id} className="flex items-center justify-between bg-white p-2 mb-2 rounded shadow">
                <span className="text-gray-700">{task.text}</span>
                <Button variant="ghost" size="sm" className="w-full" onClick={() => onRemoveTask(task.id)}>
                  <X className="h-4 w-4" />
                </Button>
              </li>
            ))}
        </ul>
      </ScrollArea>
    </div>
  )
}