import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostsChartComponent } from './posts-chart.component';

describe('PostsChartComponent', () => {
  let component: PostsChartComponent;
  let fixture: ComponentFixture<PostsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PostsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
