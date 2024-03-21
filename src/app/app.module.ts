import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Import FormsModule
import { HttpClientModule } from '@angular/common/http';
import { ShowExpensesComponent } from './show-expenses/show-expenses.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { ExpenseSummaryComponentComponent } from './expense-summary-component/expense-summary-component.component';
import { HomeComponent } from './home/home.component';



@NgModule({
  
  declarations: [
    AppComponent,
    AddExpenseComponent,
    EditExpenseComponent,
    ShowExpensesComponent,
    ExpenseSummaryComponentComponent,
    HomeComponent,
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatDatepickerModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
