import {Cell} from "./cell";
export class ObstacleCell extends Cell {
    constructor(scene: Phaser.Scene, x: number, y: number, xCord: number, yCord: number) {
        super(scene, x, y, 'obstacle', xCord, yCord);
        this.canMove = false;
    }
}
