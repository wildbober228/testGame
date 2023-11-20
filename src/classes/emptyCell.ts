import {Cell} from "./cell";
export class EmptyCell extends Cell {
    constructor(scene: Phaser.Scene, x: number, y: number, xCord: number, yCord: number) {
        super(scene, x, y, 'cell', xCord, yCord);
        this.canChangeType = true;
    }
}
