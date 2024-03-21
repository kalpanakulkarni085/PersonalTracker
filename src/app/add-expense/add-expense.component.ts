import { Component } from '@angular/core';
import { ExpenseService } from '../expense.service';
import { Router } from '@angular/router';
import { DatePipe, formatDate } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-add-expense',
  templateUrl: './add-expense.component.html',
  styleUrls: ['./add-expense.component.css'],
  providers: [DatePipe],
})
export class AddExpenseComponent {
  // newExpense: any = {
  //   category: '',
  //   amount: 0,
  //   expenseDate: new Date(),
  //   description: ''
  // };
  ExpenseData:any;
  newExpenseData:any;
  categories: string[] = ['Groceries', 'Petrol', 'Rent', 'Bill',];

  constructor(private expenseService: ExpenseService, private router:Router,private http: HttpClient,private datePipe: DatePipe) {}
  ngOnInit(): void {
    this.expenseService.ExpenseData.subscribe(data =>{
      this.ExpenseData= data;  
      
    });
    
  }
  
  addExpense(data:any) {
  
      
      // data.date = this.datePipe.transform(data.date, 'MM/dd/yyyy');
  
    
    
    console.log('Data received:', data);
      const headers = new HttpHeaders().set('Content-Type', 'application/json');
  
      this.http.post<any>('https://localhost:44391/api/Expense/', data, {headers})
        .subscribe(
          response => {
            console.log('Response received from server:', response);
  
            // Attempt to parse and format the response date
            let formattedDate = null;
            if (response && response.date) {
              formattedDate = this.datePipe.transform(response.date, 'yyyy-MM-dd');
              console.log('Formatted date:', formattedDate);
            } else {
              console.error('Response or response date is missing or invalid.');
            }
            console.log('Expense added successfully:', response);
            this.router.navigate(['expenses']);
          },
          error => {
            console.error('Failed to add expense:', error);
          }
        );
  
  
      // this.expenseService.addexpenses(data).subscribe(
      //   expenses => {
      //     this.newExpenseData = expenses;
      //     console.log('Expense added successfully:', expenses);
      //     this.router.navigate(['expenses']);
      //   },
      //   error => {
      //     console.error('Failed to add expense:', error);
      //   }
      // );
    } 
}


