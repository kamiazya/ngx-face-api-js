import { Directive, Input, ElementRef, Injector, OnInit } from '@angular/core';
import { Overlay } from '@angular/cdk/overlay';
import { FeatureToken, TaskTypeToken } from '../tokens';
import { DetectTask } from '../classes';
import { AbstractDetectDirective } from './abbstract-detect.directive';
@Directive({
  selector: 'img[singleFace]',
  exportAs: 'face',
})
export class DetectSingleFaceImgDirective extends AbstractDetectDirective
  implements OnInit {
  @Input()
  public with: FeatureToken[] = [];
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
