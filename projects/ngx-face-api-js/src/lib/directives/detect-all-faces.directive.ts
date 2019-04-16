import { Directive, Input, ElementRef, Injector, OnInit, AfterViewInit } from '@angular/core';
import { Overlay, OverlayConfig } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { FeatureToken, TaskTypeToken } from '../tokens';
import { DetectTask } from '../classes';
import { DetectionResultComponent } from '../components/detection-result/detection-result.component';

abstract class AbstractDetectDirective implements OnInit, AfterViewInit {

  protected abstract with: FeatureToken[] = [];
  protected abstract type: TaskTypeToken;
  protected abstract stream: boolean;

  constructor(
    protected el: ElementRef<HTMLImageElement>,
    protected overlay: Overlay,
    protected injector: Injector,
  ) { }
  public task: DetectTask;

  ngOnInit() {
    this.task = new DetectTask({
      type: this.type,
      tokens: this.with,
      realtime: this.stream,
    });
  }
  ngAfterViewInit() {
    this.task.resolveTarget(this.el.nativeElement);

    const positionStrategy = this.overlay
      .position()
      .flexibleConnectedTo(this.el)
      .withPositions([
        {
          overlayX: 'start', overlayY: 'top',
          originX: 'start',  originY: 'top'
        },
      ])
      .withFlexibleDimensions(false)
      .withLockedPosition(true)
      ;

    const scrollStrategy = this.overlay.scrollStrategies.reposition();
    const config = new OverlayConfig({
      positionStrategy,
      scrollStrategy,
      hasBackdrop: false,
    });
    const overlayRef = this.overlay.create(config);
    const injector = Injector.create({
      parent: this.injector,
      providers: [
        {
          provide: DetectTask,
          useValue: this.task,
        }
      ],
    });

    const portal = new ComponentPortal(DetectionResultComponent, undefined, injector);
    overlayRef.attach(portal);
  }
}

@Directive({
  selector: 'img[allFaces]',
  exportAs: 'faces',
})
export class DetectAllFacesImgDirective extends AbstractDetectDirective {

  @Input() public with: FeatureToken[] = [];

  constructor(
    el: ElementRef<HTMLImageElement>,
    overlay: Overlay,
    injector: Injector,
  ) {
    super(el, overlay, injector);
  }

  protected type: TaskTypeToken = 'all';
  protected stream = false;

}

@Directive({
  selector: 'img[singleFace]',
  exportAs: 'face',
})
export class DetectSingleFaceImgDirective
  extends AbstractDetectDirective
  implements OnInit {

  @Input() public with: FeatureToken[] = [];

  constructor(
    el: ElementRef<HTMLImageElement>,
    overlay: Overlay,
    injector: Injector,
  ) {
    super(el, overlay, injector);
  }

  protected type: TaskTypeToken = 'single';
  protected stream = false;

  ngOnInit() {
    this.task = new DetectTask({
      type: this.type,
      tokens: this.with,
      realtime: this.stream,
    });
  }

}


@Directive({
  selector: 'video[allFaces]',
  exportAs: 'faces',
})
export class DetectAllFacesVideoDirective extends AbstractDetectDirective {
  @Input() public with: FeatureToken[] = [];

  constructor(
    el: ElementRef<HTMLImageElement>,
    overlay: Overlay,
    injector: Injector,
  ) {
    super(el, overlay, injector);
  }

  protected type: TaskTypeToken = 'all';
  protected stream = true;

}
