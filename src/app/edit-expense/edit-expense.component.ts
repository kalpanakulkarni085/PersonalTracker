import { Component } from '@angular/core';
import { Expense, ExpenseService } from '../expense.service';
import {ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-expense',
  templateUrl: './edit-expense.component.html',
  styleUrls: ['./edit-expense.component.css']
})
export class EditExpenseComponent {

  expense: Expense = {
    expenseID: 0,
    category: '',
    amount: 0,
    expenseDate: new Date(),
    description: ''
  };
  expenseForm: FormGroup;
  updatedExpenseData:any;

  constructor(private expenseService: ExpenseService, private route: ActivatedRoute, private http: HttpClient,
    private router: Router, private formBuilder: FormBuilder) {
    this.expenseForm = this.formBuilder.group({
      category: ['', Validators.required],
      amount: ['', Validators.required],
      date: ['', Validators.required],
      description: ['']
    });
  }
     
  ngOnInit(): void {
    
    

    this.route.paramMap.subscribe(params => {
      const idParam = params.get('id');
      if (idParam) {
        this.getExpense(idParam);
    }
    });
  }  
  expensecurrentdata:any;
  apiUrl = 'https://localhost:44391/api/Expense';
  getExpense(id: any): void {
    const url = `${this.apiUrl}/${id}`;
    this.http.get(url).subscribe(expense => {
      this.expensecurrentdata = expense;
        
      });
  }
  

  
  updateExpense(expense: any): void {
  
    const url = `${this.apiUrl}/${expense.id}`;
    this.http.put(url, expense).subscribe(expense => {
      this.expensecurrentdata = expense;
      this.router.navigate(['expenses']);
      });
  }
}
