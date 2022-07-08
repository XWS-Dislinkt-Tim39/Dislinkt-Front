import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsChartComponent } from './jobs-chart.component';

describe('JobsChartComponent', () => {
  let component: JobsChartComponent;
  let fixture: ComponentFixture<JobsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JobsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(JobsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
