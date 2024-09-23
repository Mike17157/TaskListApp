"use client"
import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface Task {
  id: string
  text: string
  category: string
}

interface TaskListProps {
  tasks: Task[]
  selectedCategoryName: string
  onRemoveTask: (taskId: string) => void
}

export function TaskList({ tasks, selectedCategoryName, onRemoveTask }: TaskListProps) {
  return (
    <div className="flex-grow p-4 bg-white">
      <h2 className="text-xl font-bold mb-4 text-black">
        Tasks - {selectedCategoryName}
      </h2>
      <ScrollArea className="h-[calc(100vh-200px)]">
        <ul className="space-y-2.5">
          {tasks.map((task) => (
            <li key={task.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
              <span className="text-black">{task.text}</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onRemoveTask(task.id)}
                className="text-black hover:bg-gray-200"
              >
                <X className="h-4 w-4" />
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
    </div>
  )
}