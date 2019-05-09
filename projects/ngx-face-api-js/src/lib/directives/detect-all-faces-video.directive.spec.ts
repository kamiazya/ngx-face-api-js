import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NgxFaceApiJsModule } from '../ngx-face-api-js.module';

// Simple test component that will not in the actual app
@Component({
  template: '<img allFaces>',
})
class TestComponent {}

describe('DetectAllFacesDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NgxFaceApiJsModule.forRoot({ modelsUrl: '/' })],
      declarations: [TestComponent],
    });

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should create an instance', () => {
    expect(component).toBeDefined();
  });
});
