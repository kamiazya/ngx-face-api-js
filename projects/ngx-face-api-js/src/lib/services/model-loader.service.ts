import { Injectable, Inject } from '@angular/core';
// tslint:disable-next-line:max-line-length
import { loadMtcnnModel, loadSsdMobilenetv1Model, loadFaceExpressionModel, loadFaceLandmarkModel, loadTinyFaceDetectorModel, loadFaceRecognitionModel } from 'face-api.js';
// tslint:disable-next-line:max-line-length
import { ModelToken, ModelsUrl, FeatureToken, SsdMobilenetv1Model, FaceExpressionModel, FaceLandmarkModel, FaceRecognitionModel, ExpressionsFeatureToken, LandmarksFeatureToken, DescriptorsFeatureToken } from '../tokens';


@Injectable()
export class ModelLoaderService {

  private loadedModels: ModelToken[] = [];

  constructor(
    @Inject(ModelsUrl)
    private modelUrl: string,
  ) { }

  private getReqiredModels(tokens: FeatureToken[]): ModelToken[] {
    return [SsdMobilenetv1Model].concat(Object
      .entries({
        [ExpressionsFeatureToken]: [FaceExpressionModel, SsdMobilenetv1Model],
        [LandmarksFeatureToken]: [FaceLandmarkModel, SsdMobilenetv1Model],
        [DescriptorsFeatureToken]: [FaceRecognitionModel],
      })
      .map(([key, models]) => tokens.includes(key as FeatureToken) ? models : [])
      .reduce((a, b) => a.concat(b))
      .filter((v, i, arr) => arr.indexOf(v) === i))
      ;
  }

  private mapLoadFunction(model: ModelToken) {
    switch (model) {
      case 'SsdMobilenetv1Model':   return loadSsdMobilenetv1Model;
      case 'MtcnnModel':            return loadMtcnnModel;
      case 'FaceExpressionModel':   return loadFaceExpressionModel;
      case 'FaceLandmarkModel':     return loadFaceLandmarkModel;
      case 'FaceRecognitionModel':  return loadFaceRecognitionModel;
      case 'TinyFaceDetectorModel': return loadTinyFaceDetectorModel;
    }
  }


  public isLoaded(model: ModelToken): boolean {
    return this.loadedModels.includes(model);
  }

  async load(...models: ModelToken[]): Promise<void> {
    const loadTargetModels = models
      .filter(m => this.isLoaded(m) === false);

    await Promise
      .all(
        loadTargetModels
          .map(m => this.mapLoadFunction(m))
          .map(load => load(this.modelUrl)));

    if (loadTargetModels.length >= 0) {
      this.loadedModels = loadTargetModels.concat(this.loadedModels);
    }
  }

  async loadForFeature(tokens: FeatureToken[]): Promise<void> {
    const reqiredModels = this.getReqiredModels(tokens);
    console.log({ reqiredModels });
    await this.load(...reqiredModels);
  }
}
