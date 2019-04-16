import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionResultComponent } from './detection-result.component';

describe('DetectionResultComponent', () => {
  let component: DetectionResultComponent;
  let fixture: ComponentFixture<DetectionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetectionResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetectionResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
