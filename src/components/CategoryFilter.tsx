
import React from 'react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface CategoryFilterProps {
  categories: { id: string; name: string }[];
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selectedCategory,
  onSelectCategory,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-xl font-medium mb-4">Thể loại</h2>
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onSelectCategory(null)}
          className={cn(
            "border-bookstore-burgundy",
            selectedCategory === null && "bg-bookstore-burgundy text-white"
          )}
        >
          Tất cả
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant="outline"
            size="sm"
            onClick={() => onSelectCategory(category.id)}
            className={cn(
              "border-bookstore-burgundy",
              selectedCategory === category.id && "bg-bookstore-burgundy text-white"
            )}
          >
            {category.name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;
