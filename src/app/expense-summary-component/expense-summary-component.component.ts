import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';

@Component({
  selector: 'app-expense-summary-component',
  templateUrl: './expense-summary-component.component.html',
  styleUrl: './expense-summary-component.component.css'
})
export class ExpenseSummaryComponentComponent implements OnInit {

  totalExpenses: number = 0;
  expensesByCategory: { category: string, total: number }[] = [];

  constructor(private expenseService: ExpenseService) { }

  ngOnInit(): void {
    this.fetchExpenseSummary();
  }

  fetchExpenseSummary(): void {
    // Fetch expenses data for the current month
    this.expenseService.getExpensesForCurrentMonth().subscribe(expenses => {
      // Calculate total expenses for the month
      this.totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0);

      // Group expenses by category and calculate total expenses for each category
      const groupedExpenses = expenses.reduce((groups, expense) => {
        if (!groups[expense.category]) {
          groups[expense.category] = 0;
        }
        groups[expense.category] += expense.amount;
        return groups;
      }, {});
      this.expensesByCategory = Object.keys(groupedExpenses).map(category => ({ category, total: groupedExpenses[category] }));
    });
  }
}
