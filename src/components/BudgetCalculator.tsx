// src/components/BudgetCalculator.tsx
import React, { useState, useEffect } from 'react';
import '../styles/BudgetCalculator.css';
import BudgetForm from './BudgetForm';
import BudgetSummary from './BudgetSummary';
import { BudgetCategory} from '../types/budgetTypes';

const BudgetCalculator: React.FC = () => {
  const initialCategories: BudgetCategory[] = [
    {
      id: 'giving',
      name: 'Giving',
      type: 'want',
      amount: 0,
      color: '#608B2F',
    },
    {
      id: 'savings',
      name: 'Savings',
      type: 'need',
      amount: 0,
      color: '#1E88E5',
      subcategories: [
        { id: 'emergency', name: 'Emergency Fund', amount: 0 },
        { id: 'investments', name: 'Investments', amount: 0 },
        { id: 'retirement', name: 'Retirement', amount: 0 }
      ]
    },
    {
      id: 'food',
      name: 'Food',
      type: 'need',
      amount: 0,
      color: '#4FC3F7',
      subcategories: [
        { id: 'groceries', name: 'Groceries', amount: 0 },
        { id: 'dining', name: 'Dining out', amount: 0 }
      ]
    },
    {
      id: 'utilities',
      name: 'Utilities',
      type: 'need',
      amount: 0,
      color: '#E53935',
      subcategories: [
        { id: 'electricity', name: 'Electricity', amount: 0 },
        { id: 'water', name: 'Water', amount: 0 },
        { id: 'internet', name: 'Internet', amount: 0 },
        { id: 'phone', name: 'Phone', amount: 0 }
      ]
    },
    {
      id: 'housing',
      name: 'Housing',
      type: 'need',
      amount: 0,
      color: '#3949AB',
      subcategories: [
        { id: 'mortgage', name: 'Mortgage/Rent', amount: 0 },
        { id: 'insurance', name: 'Home Insurance', amount: 0 },
        { id: 'taxes', name: 'Property Taxes', amount: 0 },
        { id: 'hoa', name: 'HOA Fees', amount: 0 }
      ]
    },
    {
      id: 'transportation',
      name: 'Transportation',
      type: 'need',
      amount: 0,
      color: '#8BC34A',
      subcategories: [
        { id: 'car_payment', name: 'Car Payment', amount: 0 },
        { id: 'insurance', name: 'Car Insurance', amount: 0 },
        { id: 'fuel', name: 'Fuel', amount: 0 },
        { id: 'maintenance', name: 'Maintenance', amount: 0 },
        { id: 'public', name: 'Public Transportation', amount: 0 }
      ]
    },
    {
      id: 'insurance',
      name: 'Insurance',
      type: 'need',
      amount: 0,
      color: '#FFA000',
      subcategories: [
        { id: 'health', name: 'Health Insurance', amount: 0 },
        { id: 'life', name: 'Life Insurance', amount: 0 },
        { id: 'disability', name: 'Disability Insurance', amount: 0 }
      ]
    },
    {
      id: 'household',
      name: 'Household Items',
      type: 'need',
      amount: 0,
      color: '#7B1FA2',
      subcategories: [
        { id: 'supplies', name: 'Supplies', amount: 0 },
        { id: 'furniture', name: 'Furniture', amount: 0 },
        { id: 'appliances', name: 'Appliances', amount: 0 }
      ]
    },
    {
      id: 'debt',
      name: 'Debt',
      type: 'need',
      amount: 0,
      color: '#1976D2',
      subcategories: [
        { id: 'student_loans', name: 'Student Loans', amount: 0 },
        { id: 'credit_cards', name: 'Credit Cards', amount: 0 },
        { id: 'personal_loans', name: 'Personal Loans', amount: 0 }
      ]
    },
    {
      id: 'personal',
      name: 'Personal',
      type: 'want',
      amount: 0,
      color: '#9C27B0',
      subcategories: [
        { id: 'clothing', name: 'Clothing', amount: 0 },
        { id: 'personal_care', name: 'Personal Care', amount: 0 },
        { id: 'fitness', name: 'Fitness', amount: 0 },
        { id: 'pet', name: 'Pet Supplies', amount: 0 }
      ]
    },
    {
      id: 'entertainment',
      name: 'Entertainment',
      type: 'want',
      amount: 0,
      color: '#673AB7',
      subcategories: [
        { id: 'subscriptions', name: 'Subscriptions', amount: 0 },
        { id: 'dining', name: 'Dining Out', amount: 0 },
        { id: 'travel', name: 'Travel', amount: 0 },
        { id: 'hobbies', name: 'Hobbies', amount: 0 }
      ]
    },
    {
      id: 'other',
      name: 'Other',
      type: 'want',
      amount: 0,
      color: '#795548',
      subcategories: [
        { id: 'gifts', name: 'Gifts', amount: 0 },
        { id: 'donations', name: 'Donations', amount: 0 },
        { id: 'miscellaneous', name: 'Miscellaneous', amount: 0 }
      ]
    }
  ];

  const [income, setIncome] = useState<number>(0);
  const [categories, setCategories] = useState<BudgetCategory[]>(initialCategories);

  // Handle income change
  const handleIncomeChange = (value: number) => {
    setIncome(value);
  };

  // Handle category amount change
  const handleCategoryChange = (categoryId: string, value: number) => {
    setCategories(prevCategories => 
      prevCategories.map(category => 
        category.id === categoryId 
          ? { ...category, amount: value } 
          : category
      )
    );
  };

  // Handle subcategory amount change
  const handleSubcategoryChange = (categoryId: string, subcategoryId: string, value: number) => {
    setCategories(prevCategories => 
      prevCategories.map(category => {
        if (category.id === categoryId && category.subcategories) {
          // Update the subcategory
          const updatedSubcategories = category.subcategories.map(subcategory => 
            subcategory.id === subcategoryId 
              ? { ...subcategory, amount: value } 
              : subcategory
          );
          
          // Calculate the new total for the category
          const newTotal = updatedSubcategories.reduce((sum, sub) => sum + sub.amount, 0);
          
          return { 
            ...category, 
            subcategories: updatedSubcategories,
            amount: newTotal
          };
        }
        return category;
      })
    );
  };

  // Update subcategory amounts when the main category amount changes
  useEffect(() => {
    categories.forEach(category => {
      if (category.subcategories && category.subcategories.length > 0) {
        // Get current subcategory total
        const currentSubTotal = category.subcategories.reduce(
          (sum, sub) => sum + sub.amount, 
          0
        );
        
        // If the category total changes but is not from subcategory changes
        if (category.amount !== currentSubTotal) {
          // Distribute the category amount proportionally or evenly
          const newCategories = [...categories];
          const catIndex = newCategories.findIndex(c => c.id === category.id);
          
          if (catIndex !== -1 && newCategories[catIndex].subcategories) {
            // If all subcategories are 0, distribute evenly
            if (currentSubTotal === 0) {
              const subcategoryCount = newCategories[catIndex].subcategories!.length;
              const evenAmount = category.amount / subcategoryCount;
              
              newCategories[catIndex].subcategories = newCategories[catIndex].subcategories!.map(sub => ({
                ...sub,
                amount: evenAmount
              }));
            } 
            // Otherwise, distribute proportionally
            else {
              const ratio = category.amount / currentSubTotal;
              newCategories[catIndex].subcategories = newCategories[catIndex].subcategories!.map(sub => ({
                ...sub,
                amount: sub.amount * ratio
              }));
            }
            setCategories(newCategories);
          }
        }
      }
    });
  }, [categories]);

  return (
    <div className="budget-calculator">
      <BudgetForm
        income={income}
        categories={categories}
        onIncomeChange={handleIncomeChange}
        onCategoryChange={handleCategoryChange}
        onSubcategoryChange={handleSubcategoryChange}
      />
      <BudgetSummary
        income={income}
        categories={categories}
      />
    </div>
  );
};

export default BudgetCalculator;