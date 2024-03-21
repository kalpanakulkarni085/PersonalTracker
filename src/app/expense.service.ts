import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Observable } from 'rxjs/internal/Observable';

export interface Expense {
  expenseID: number;
  category: string;
  amount: number;
  expenseDate: Date;
  description: string;
}
@Injectable({
  providedIn: 'root'
})

export class ExpenseService {

  constructor(private client: HttpClient) { }

  apiUrl: string = 'https://localhost:44391/api/Expense/';


  getExpenses(){
    return this.client.get("https://localhost:44391/api/Expense/");
  }
  getExpensesForCurrentMonth(): Observable<any[]> {
    debugger;
    return this.client.get<any[]>('https://localhost:44391/api/Expense/current-month');
  }
  

  deleteExpense(id: number): Observable<any> {
    return this.client.delete(`${this.apiUrl}/${id}`);
  }
  addexpenses(data:any) {
   
    return this.client.post<any>(this.apiUrl, data, { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) });
  }

  private nameSource = new BehaviorSubject<string>('');
  private nameSource2 =new BehaviorSubject<string>('');
  ExpenseData = this.nameSource.asObservable();
  CurrentExpense = this.nameSource2.asObservable();
  changeName(ExpenseData: any) {
    this.nameSource.next(ExpenseData);
  }
  changeName2(CurrentExpense:any){
    this.nameSource2.next(CurrentExpense);
  }
  updateExpense(expense: Expense): Observable<any> {
    const url = `${this.apiUrl}/${expense.expenseID}`;
    return this.client.put(url, expense);
  }
  
 
}
