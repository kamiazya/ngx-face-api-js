import * as faceapi from 'face-api.js';
import { TaskTypeToken, FeatureToken } from '../tokens';

export class DetectTask {
  public get resolveTarget(): (
    el: HTMLImageElement | HTMLVideoElement,
  ) => void {
    return this.targetResolver;
  }

  public readonly type: TaskTypeToken;
  public readonly tokens: FeatureToken[];
  public readonly realtime: boolean;

  constructor(option: {
    type: TaskTypeToken;
    tokens: FeatureToken[];
    realtime?: boolean;
  }) {
    this.type = option.type;
    this.tokens = option.tokens;
    this.realtime = option.realtime || false;
    this.target = new Promise<HTMLImageElement | HTMLVideoElement>(
      resolver => (this.targetResolver = resolver),
    );
  }

  public target: Promise<HTMLImageElement | HTMLVideoElement>;

  private targetResolver: (el: HTMLImageElement | HTMLVideoElement) => void;

  private isMatchPattern(patten: string[], target: string[]): boolean {
    return patten.every(item => target.includes(item));
  }

  public with(...tokens: FeatureToken[]): this {
    this.tokens.push(...tokens);
    return this;
  }

  public async detect(option?: faceapi.FaceDetectionOptions): Promise<any> {
    let t: faceapi.DetectAllFacesTask | faceapi.DetectSingleFaceTask;
    if (this.type === 'all') {
      t = faceapi.detectAllFaces(await this.target, option || undefined);
    } else {
      t = faceapi.detectSingleFace(await this.target, option || undefined);
    }

    if (
      this.isMatchPattern(
        ['expressions', 'landmarks', 'ageAndGender', 'descriptors'],
        this.tokens,
      )
    ) {
      if (t instanceof faceapi.DetectSingleFaceTask) {
        return t
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()
          .withFaceDescriptor()
          .run();
      } else if (t instanceof faceapi.DetectAllFacesTask) {
        return t
          .withFaceLandmarks()
          .withFaceExpressions()
          .withAgeAndGender()
          .withFaceDescriptors()
          .run();
      }
    } else if (
      this.isMatchPattern(
        ['expressions', 'landmarks', 'descriptors'],
        this.tokens,
      )
    ) {
      if (t instanceof faceapi.DetectSingleFaceTask) {
        return t
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptor()
          .run();
      } else if (t instanceof faceapi.DetectAllFacesTask) {
        return t
          .withFaceLandmarks()
          .withFaceExpressions()
          .withFaceDescriptors()
          .run();
      }
    } else if (
      this.isMatchPattern(
        ['expressions', 'landmarks', 'ageAndGender'],
        this.tokens,
      )
    ) {
      return t
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .run();
    } else if (this.isMatchPattern(['expressions', 'landmarks'], this.tokens)) {
      return t
        .withFaceLandmarks()
        .withFaceExpressions()
        .run();
    } else if (
      this.isMatchPattern(['expressions', 'ageAndGender'], this.tokens)
    ) {
      return t
        .withFaceExpressions()
        .withAgeAndGender()
        .run();
    } else if (this.isMatchPattern(['expressions'], this.tokens)) {
      return t.withFaceExpressions().run();
    } else if (
      this.isMatchPattern(['landmarks', 'ageAndGender'], this.tokens)
    ) {
      return t
        .withFaceLandmarks()
        .withAgeAndGender()
        .run();
    } else if (this.isMatchPattern(['landmarks'], this.tokens)) {
      return t.withFaceLandmarks().run();
    }
    return t.run();
  }
}
