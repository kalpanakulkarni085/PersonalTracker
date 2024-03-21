import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

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
 
  
}

