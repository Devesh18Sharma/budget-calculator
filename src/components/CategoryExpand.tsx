// src/components/CategoryExpand.tsx
import React from 'react';
import '../styles/CategoryExpand.css';

interface CategoryExpandProps {
  categoryId: string;
  subcategories: {
    id: string;
    name: string;
    amount: number;
  }[];
  onSubcategoryChange: (categoryId: string, subcategoryId: string, value: number) => void;
}

const CategoryExpand: React.FC<CategoryExpandProps> = ({
  categoryId,
  subcategories,
  onSubcategoryChange
}) => {
  return (
    <div className="category-expand">
      {subcategories.map((subcategory) => (
        <div key={subcategory.id} className="subcategory-item">
          <label htmlFor={`subcategory-${categoryId}-${subcategory.id}`}>{subcategory.name}</label>
          <div className="input-container">
            <span className="dollar-sign">$</span>
            <input
              id={`subcategory-${categoryId}-${subcategory.id}`}
              type="number"
              value={subcategory.amount || ''}
              onChange={(e) => onSubcategoryChange(categoryId, subcategory.id, parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryExpand;