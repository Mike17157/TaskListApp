import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X, Edit, Check } from "lucide-react"

interface CategoryListProps {
  categories: string[]
  selectedCategory: string
  isEditingCategories: boolean
  onSelectCategory: (category: string) => void
  onRemoveCategory: (category: string) => void
  onToggleEditCategories: () => void
}

export function CategoryList({
  categories,
  selectedCategory,
  isEditingCategories,
  onSelectCategory,
  onRemoveCategory,
  onToggleEditCategories,
}: CategoryListProps) {
  return (
    <div className="w-1/4 bg-white p-4 border-r flex flex-col">
      <h2 className="text-xl font-bold mb-4 text-gray-800">Categories</h2>
      <ScrollArea className="flex-grow">
        <ul>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-2 rounded flex justify-between items-center ${
                selectedCategory === category ? "bg-blue-100" : ""
              }`}
            >
              <span onClick={() => onSelectCategory(category)} className="text-gray-700">{category}</span>
              {isEditingCategories && (
                <Button variant="ghost" size="sm" className="w-8 h-8 flex items-center justify-center ml-auto" onClick={() => onRemoveCategory(category)}>
                  <X className="h-4 w-4" />
                </Button>
              )}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Button
        variant="outline"
        size="sm"
        className="mt-4 self-end"
        onClick={onToggleEditCategories}
      >
        {isEditingCategories ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
      </Button>
    </div>
  )
}