import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectionResultComponent } from './detection-result.component';
import { FaceDetectorService, ModelLoaderService } from '../../services';
import { DetectTask } from '../../classes';
import { ModelsUrl } from '../../tokens';

describe('DetectionResultComponent', () => {
  let component: DetectionResultComponent;
  let fixture: ComponentFixture<DetectionResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: ModelsUrl,
          useValue: '/',
        },
        FaceDetectorService,
        ModelLoaderService,
        {
          provide: DetectTask,
          useValue: new DetectTask({
            type: 'all',
            tokens: [],
          }),
        }
      ],
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
