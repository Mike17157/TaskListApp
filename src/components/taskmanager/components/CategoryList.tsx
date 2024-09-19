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
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category}>
              <Button
                variant="row"
                className={`justify-between ${
                  selectedCategory === category
                    ? "bg-gray-200 text-gray-900"
                    : "bg-white text-gray-700"
                }`}
                onClick={() => onSelectCategory(category)}
              >
                <span>{category}</span>
                {isEditingCategories && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCategory(category);
                    }}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </Button>
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Button
        variant="row"
        size="sm"
        className="mt-4 self-end"
        onClick={onToggleEditCategories}
      >
        {isEditingCategories ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
      </Button>
    </div>
  )
}