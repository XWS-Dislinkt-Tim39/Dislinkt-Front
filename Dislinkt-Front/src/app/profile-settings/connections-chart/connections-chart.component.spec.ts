import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectionsChartComponent } from './connections-chart.component';

describe('ConnectionsChartComponent', () => {
  let component: ConnectionsChartComponent;
  let fixture: ComponentFixture<ConnectionsChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectionsChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectionsChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
