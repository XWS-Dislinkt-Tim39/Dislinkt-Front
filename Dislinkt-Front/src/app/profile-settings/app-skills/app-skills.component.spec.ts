import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppSkillsComponent } from './app-skills.component';

describe('AppSkillsComponent', () => {
  let component: AppSkillsComponent;
  let fixture: ComponentFixture<AppSkillsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AppSkillsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppSkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
