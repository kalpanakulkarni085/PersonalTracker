import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  menu:boolean=true;
  image:boolean=true;
  
  constructor(private router: Router) { }

  addnew(){
    this.router.navigate(['/add']);
    this.menu=true;
    this.image=false;
  }
  Showlist(){
    this.router.navigate(['/expenses']);
    this.menu=true;
    this.image=false;
  }
  ShowSummary(){
    this.router.navigate(['/ExpenseSummary']);
    this.menu=true;
    this.image=false;
  }
  Homepage(){
    this.router.navigate(['/Home']);
    this.menu=true;
    this.image=false;
    
  }
  
}
