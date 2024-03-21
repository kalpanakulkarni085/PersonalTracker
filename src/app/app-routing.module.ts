import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddExpenseComponent } from './add-expense/add-expense.component';
import { EditExpenseComponent } from './edit-expense/edit-expense.component';
import { ShowExpensesComponent } from './show-expenses/show-expenses.component';
import { AppComponent } from './app.component';
import { ExpenseSummaryComponentComponent } from './expense-summary-component/expense-summary-component.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
 
  {path: 'Home', component: HomeComponent},
  { path: 'ExpenseSummary', component: ExpenseSummaryComponentComponent },
  { path: 'expenses', component: ShowExpensesComponent },
  { path: 'add', component: AddExpenseComponent },
  { path: 'edit/:id', component: EditExpenseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
