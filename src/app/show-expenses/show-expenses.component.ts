import { Component, OnInit } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-expenses',
  templateUrl: './show-expenses.component.html',
  styleUrl: './show-expenses.component.css'
})
export class ShowExpensesComponent implements OnInit {

  CurrentExpense: any;
  years: number[] = [];
  categories:any;
  selectedCategory: string = '';
  selectedYear : number; 
  constructor(private expenseService: ExpenseService, private router: Router, private http: HttpClient) { 
    this.selectedYear = new Date().getFullYear();;
  }
  expenses: any;
  elist: boolean = false;
  ExpenseData: any;
  ngOnInit(): void {
    this.loadExpenses();
    this.populateYears();
  
    this.expenseService.ExpenseData.subscribe(data => {
      this.ExpenseData = data;

    });
  }
  addExpense() {
    this.router.navigate(['add']);
    this.elist = false;
  }
  loadExpenses() {
    this.elist = true;
    this.expenseService.getExpenses().subscribe(expenses => {
      this.expenses = expenses;
      if (this.expenses) {
        this.changeName(this.expenses);

      }

    });
  }

  changeName(data: any[]) {
    this.expenseService.changeName(data);

    // Extract distinct categories
    this.categories = Array.from(new Set(data.map((expense: any) => expense.category)));
  }

  apiUrl = 'https://localhost:44391/api/Expense'; // Adjust the URL according to your API

  deleteExpense(expenseId: number) {
    const url = `${this.apiUrl}/${expenseId}`; // Construct the URL without the extra slash

    this.http.delete(url).subscribe(
      () => {
        console.log('Expense deleted successfully');
        // Optionally, you can remove the deleted expense from the local array
        this.expenses = this.expenses.filter((expense: any) => expense.expenseID !== expenseId);
      },
      error => {
        console.error('Failed to delete expense:', error);
      }
    );
  }
  filterExpenses() {
    console.log('Selected category:', this.selectedCategory);
    
      // Filter expenses based on selected category
      const url = `${this.apiUrl}/category?category=${this.selectedCategory}`;
      this.http.get<any[]>(url).subscribe({
        next: (expenses: any[]) => {
          this.expenses = expenses;
        },
        error: (error) => {
          console.error('Failed to filter expenses:', error);
        }
      });
    
  }

  populateYears(): void {
    const currentYear = new Date().getFullYear();
    const startYear = currentYear - 10; // Change the range if needed
    // const endYear = currentYear - 1;
    for (let year = startYear; year <= currentYear; year++) {
      this.years.push(year);
    }
  }

  getExpenseReport(year: number): void {
    console.log('Selected year:', year);
    
      this.http.get<any[]>(`https://localhost:44391/api/expense/report?year=${year}`)
        .subscribe(
          (data: any[]) => {
            this.expenses = data;
          },
          error => {
            console.error('Failed to fetch expense report:', error);
          }
        );
    
  }
  
}



