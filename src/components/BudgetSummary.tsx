// src/components/BudgetSummary.tsx
import React from 'react';
import '../styles/BudgetSummary.css';
import { BudgetCategory } from '../types/budgetTypes';

interface BudgetSummaryProps {
  income: number;
  categories: BudgetCategory[];
}

const BudgetSummary: React.FC<BudgetSummaryProps> = ({ income, categories }) => {
  const totalExpenses = categories.reduce((sum, category) => sum + category.amount, 0);
  const savings = categories.find(cat => cat.id === 'savings')?.amount || 0;
  const expenses = totalExpenses - savings;
  const difference = income - totalExpenses;

  // Calculate percentages for donut chart
  const calculatePercentage = (amount: number) => {
    return income > 0 ? (amount / income) * 100 : 0;
  };

  return (
    <div className="budget-summary">
      <div className="summary-totals">
        <div className="summary-item income">
          <h3>MONTHLY INCOME</h3>
          <p>${income.toFixed(2)}</p>
        </div>
        <div className="summary-item savings">
          <h3>MONTHLY SAVINGS</h3>
          <p>${savings.toFixed(2)}</p>
        </div>
        <div className="summary-item expenses">
          <h3>MONTHLY EXPENSES</h3>
          <p>${expenses.toFixed(2)}</p>
        </div>
        
        {categories
          .filter(cat => cat.id !== 'savings' && cat.amount > 0)
          .map(category => (
            <div 
              key={category.id} 
              className={`summary-item ${category.type === 'need' ? 'need' : 'want'}`}
            >
              <h4>{category.name}</h4>
              <p>${category.amount.toFixed(2)}</p>
            </div>
          ))
        }
        
        <div className={`summary-item difference ${difference >= 0 ? 'positive' : 'negative'}`}>
          <h3>DIFFERENCE</h3>
          <p>${difference.toFixed(2)}</p>
        </div>
      </div>

      {income > 0 && (
        <div className="chart-container">
          <div className="donut-chart">
            <div className="chart-inner">
              <h3>Total Expenses</h3>
              <p>${totalExpenses.toFixed(2)}</p>
            </div>
            <svg viewBox="0 0 36 36" className="circular-chart">
              <path 
                className="circle-bg"
                d="M18 2.0845
                  a 15.9155 15.9155 0 0 1 0 31.831
                  a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              {categories.reduce((acc, category, index, arr) => {
                // Calculate all previous percentages combined
                const previousPercentages = arr
                  .slice(0, index)
                  .reduce((sum, cat) => sum + calculatePercentage(cat.amount), 0);
                
                const percentage = calculatePercentage(category.amount);
                if (percentage > 0) {
                  // Calculate stroke-dasharray and stroke-dashoffset
                  const circumference = 100;
                  const offset = circumference - previousPercentages;
                  acc.push(
                    <circle
                      key={category.id}
                      className="circle"
                      stroke={category.color}
                      strokeWidth="3.8"
                      strokeDasharray={`${percentage} ${circumference - percentage}`}
                      strokeDashoffset={offset}
                      r="15.9155"
                      cx="18"
                      cy="18"
                    />
                  );
                }
                return acc;
              }, [] as React.ReactElement[])}
            </svg>
          </div>
        </div>
      )}

      <div className="budget-cta">
        <h3>Great start! What's next?</h3>
        <p>
          What you really need is a monthly budget—a solid plan for how to spend every dollar you make. 
          Because you work hard for that income! Make it work hard for you.
        </p>
        <button className="start-budgeting-btn">Start Budgeting for Free</button>
      </div>
    </div>
  );
};

export default BudgetSummary;