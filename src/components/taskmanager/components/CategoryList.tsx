import React from "react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button"
import { X, Edit, Check } from "lucide-react"

interface Category {
  id: string
  name: string
}

interface CategoryListProps {
  categories: Category[]
  selectedCategory: Category | null
  isEditingCategories: boolean
  onSelectCategory: (categoryId: string) => void
  onRemoveCategory: (categoryId: string) => void
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
      <h2 className="text-xl font-bold mb-2 text-black">Categories</h2>
      <ScrollArea className="flex-grow">
        <ul className="space-y-1">
          {categories.map((category) => (
            <li key={category.id}>
              <Button
                variant="row"
                className={`justify-between ${
                  selectedCategory?.id === category.id
                    ? "bg-gray-200 text-black"
                    : "bg-white text-black"
                }`}
                onClick={() => onSelectCategory(category.id)}
              >
                <span className="text-sm font-medium">{category.name}</span>
                {isEditingCategories && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 text-black"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveCategory(category.id);
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
        className="mt-4 self-end text-black"
        onClick={onToggleEditCategories}
      >
        {isEditingCategories ? <Check className="h-4 w-4" /> : <Edit className="h-4 w-4" />}
      </Button>
    </div>
  )
}