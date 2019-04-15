import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxFaceApiJsComponent } from './ngx-face-api-js.component';

describe('NgxFaceApiJsComponent', () => {
  let component: NgxFaceApiJsComponent;
  let fixture: ComponentFixture<NgxFaceApiJsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxFaceApiJsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxFaceApiJsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
