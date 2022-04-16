import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarNotRegisteredComponent } from './navbar-not-registered.component';

describe('NavbarNotRegisteredComponent', () => {
  let component: NavbarNotRegisteredComponent;
  let fixture: ComponentFixture<NavbarNotRegisteredComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarNotRegisteredComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarNotRegisteredComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
