import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarStatsComponent } from './bar-stats.component';

describe('BarStatsComponent', () => {
  let component: BarStatsComponent;
  let fixture: ComponentFixture<BarStatsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarStatsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarStatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
