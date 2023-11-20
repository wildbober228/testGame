import {Cell} from "./cell";
export class ColorCell extends Cell {
    private color = Math.random() * 0xffffff;
    constructor(scene: Phaser.Scene, x: number, y: number, xCord: number, yCord: number) {
        super(scene, x, y, 'cell', xCord, yCord);
        this.isColorCell = true;
        this.setTintFill(this.color, this.color, this.color, this.color)
    }
}
