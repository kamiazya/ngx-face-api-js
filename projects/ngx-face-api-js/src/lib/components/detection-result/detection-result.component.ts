import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Renderer2,
  OnDestroy,
  HostListener,
} from '@angular/core';
import { Subscription, Subject, combineLatest } from 'rxjs';

import * as faceapi from 'face-api.js';
import { map, startWith } from 'rxjs/operators';
import { DetectTask } from '../../classes';
import { FaceDetectorService } from '../../services/face-detector.service';

@Component({
  templateUrl: './detection-result.component.html',
  styleUrls: ['./detection-result.component.scss'],
})
export class DetectionResultComponent implements OnInit, OnDestroy {
  subscription = new Subscription();

  @ViewChild('canvas')
  private canvasEl: ElementRef<HTMLCanvasElement>;

  private get canvas(): HTMLCanvasElement {
    return this.canvasEl.nativeElement;
  }

  private resize$ = new Subject();

  @HostListener('window:resize')
  public onResize() {
    this.resize$.next('onResize');
  }

  constructor(
    private task: DetectTask,
    private el: ElementRef,
    private renderer: Renderer2,
    private faceDetector: FaceDetectorService,
  ) {}

  private convertResultToArray(result: any): any[] {
    if (Array.isArray(result)) {
      return result;
    }
    return [result];
  }

  ngOnInit() {
    this.subscription.add(
      combineLatest(
        this.faceDetector.detect(this.task),
        this.resize$.pipe(startWith('init')),
      )
        .pipe(map(([result]) => this.convertResultToArray(result)))
        .subscribe(result => this.draw(result)),
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  private async draw(results: any[]) {
    const target = await this.task.target;
    let { width, height } = target;
    if (target instanceof HTMLVideoElement) {
      height = target.videoHeight;
      width = target.videoWidth;
    }

    const detectionsForSize = faceapi.resizeResults(
      results.map(result =>
        result instanceof faceapi.FaceDetection ? result : result.detection,
      ),
      { width, height },
    );

    this.canvas.width = width;
    this.canvas.height = height;
    this.renderer.setStyle(this.canvas, 'width', `${width}px`);
    this.renderer.setStyle(this.canvas, 'height', `${height}px`);
    if (this.task.tokens.length >= 1) {
      faceapi.draw.drawDetections(this.canvas, detectionsForSize);

      const resizeResults = faceapi.resizeResults(results, { width, height });
      if (this.task.tokens.includes('expressions')) {
        faceapi.draw.drawFaceExpressions(
          this.canvas,
          resizeResults.map(({ detection, expressions }) => ({
            position: detection.box,
            expressions,
          })),
        );
      }

      if (this.task.tokens.includes('landmarks')) {
        faceapi.draw.drawFaceLandmarks(
          this.canvas,
          resizeResults.map(({ landmarks }) => landmarks),
        );
      }
    } else {
      faceapi.draw.drawDetections(this.canvas, detectionsForSize);
    }
  }
}
