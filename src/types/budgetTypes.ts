// src/types/budgetTypes.ts
export interface BudgetCategory {
    id: string;
    name: string;
    type: 'need' | 'want' | 'saving';
    amount: number;
    color: string;
    subcategories?: {
      id: string;
      name: string;
      amount: number;
    }[];
  }
  
  export interface BudgetData {
    monthlyIncome: number;
    categories: BudgetCategory[];
  }