import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountUpadateComponent } from './account-upadate.component';

describe('AccountUpadateComponent', () => {
  let component: AccountUpadateComponent;
  let fixture: ComponentFixture<AccountUpadateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AccountUpadateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountUpadateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
