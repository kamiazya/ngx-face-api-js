import { ElementRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { TaskTypeToken } from '../tokens/TaskTypeToken';
import { FeatureToken } from '../tokens/FeatureToken';
import { DetectTask } from '../classes/DetectTask';
import { DetectionResultComponent } from '../components/detection-result/detection-result.component';

export abstract class AbstractDetectDirective implements OnInit, AfterViewInit {
  protected abstract with: FeatureToken[] = [];
  protected abstract type: TaskTypeToken;
  protected abstract stream: boolean;
  constructor(
    protected el: ElementRef<HTMLImageElement>,
    protected overlay: Overlay,
    protected injector: Injector,
  ) {}
  public task: DetectTask;
  ngOnInit() {
    this.task = new DetectTask({
      type: this.type,
      tokens: this.with,
      realtime: this.stream,
    });
  }

  private get orverlayPositionStrategy() {
    return this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([
        {
          overlayX: 'start',
          overlayY: 'top',
          originX: 'start',
          originY: 'top',
        },
      ])
      .withFlexibleDimensions(false)
      .withLockedPosition(true);
  }

  private createOverlay() {
    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const config = new OverlayConfig({
      positionStrategy: this.orverlayPositionStrategy,
      scrollStrategy,
      hasBackdrop: false,
    });
    return this.overlay.create(config);
  }

  private createInjector(): Injector {
    return Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: DetectTask,
          useValue: this.task,
        },
      ],
    });
  }

  ngAfterViewInit() {
    this.task.resolveTarget(this.el.nativeElement);
    const overlayRef = this.createOverlay();
    const injector = this.createInjector();
    const portal = new ComponentPortal(
      DetectionResultComponent,
      undefined,
      injector,
    );
    overlayRef.attach(portal);
  }
}
