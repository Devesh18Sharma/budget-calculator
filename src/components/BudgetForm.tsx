// src/components/BudgetForm.tsx
import React, { useState } from 'react';
import '../styles/BudgetForm.css';
import { BudgetCategory } from '../types/budgetTypes';
import CategoryExpand from './CategoryExpand';

interface BudgetFormProps {
  income: number;
  categories: BudgetCategory[];
  onIncomeChange: (value: number) => void;
  onCategoryChange: (categoryId: string, value: number) => void;
  onSubcategoryChange: (categoryId: string, subcategoryId: string, value: number) => void;
}

const BudgetForm: React.FC<BudgetFormProps> = ({
  income,
  categories,
  onIncomeChange,
  onCategoryChange,
  onSubcategoryChange
}) => {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);

  const toggleCategory = (categoryId: string) => {
    setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  };

  return (
    <div className="budget-form">
      <h2>Budget Calculator</h2>
      <p className="description">
        Enter your income and the calculator will show the national averages for most budget categories as a starting point. 
        A few of these are recommendations (like giving). Most just reflect average spending (like debt). 
        Don't have debt? Yay! Move that money to your current money goal.
      </p>

      <div className="income-section">
        <h3>Income</h3>
        <div className="input-group">
          <label htmlFor="monthly-income">Monthly Income (after taxes)</label>
          <div className="input-container">
            <span className="dollar-sign">$</span>
            <input
              id="monthly-income"
              type="number"
              value={income || ''}
              onChange={(e) => onIncomeChange(parseFloat(e.target.value) || 0)}
              placeholder="0.00"
            />
          </div>
        </div>
      </div>

      <div className="expenses-section">
        <h3>Expenses</h3>
        {categories.map((category) => (
          <div key={category.id} className="category-item">
            <div className="category-header">
              <div className="category-indicator" style={{ backgroundColor: category.color }}></div>
              <label htmlFor={`category-${category.id}`}>{category.name}</label>
              <button 
                className="expand-button"
                onClick={() => toggleCategory(category.id)}
              >
                {expandedCategory === category.id ? '−' : '+'}
              </button>
              <div className="input-container">
                <span className="dollar-sign">$</span>
                <input
                  id={`category-${category.id}`}
                  type="number"
                  value={category.amount || ''}
                  onChange={(e) => onCategoryChange(category.id, parseFloat(e.target.value) || 0)}
                  placeholder="0.00"
                />
              </div>
            </div>
            
            {expandedCategory === category.id && category.subcategories && (
              <CategoryExpand 
                categoryId={category.id}
                subcategories={category.subcategories}
                onSubcategoryChange={onSubcategoryChange}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BudgetForm;