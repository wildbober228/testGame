import { Scene } from 'phaser';
export class LoadingScene extends Scene {

  constructor() {
    super('loading-scene');
  }

  preload(): void {
    this.load.baseURL = 'assets/';
    this.load.image('player', 'sprites/triangle.png');
    this.load.image('coolPlayer', 'sprites/circle.png');
    this.load.image('cell', 'sprites/cell.png');
    this.load.image('obstacle', 'sprites/obstacle.png');
  }

  create(): void {
    this.scene.start('level-scene');
  }
}
