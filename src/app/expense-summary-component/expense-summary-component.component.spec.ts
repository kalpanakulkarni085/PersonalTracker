import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSummaryComponentComponent } from './expense-summary-component.component';

describe('ExpenseSummaryComponentComponent', () => {
  let component: ExpenseSummaryComponentComponent;
  let fixture: ComponentFixture<ExpenseSummaryComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ExpenseSummaryComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ExpenseSummaryComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
