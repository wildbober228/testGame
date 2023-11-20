import { Physics } from 'phaser';
export class Cell extends Physics.Arcade.Sprite {
    public xCord = 0;
    public yCord = 0;
    public canMove = true;
    public isColorCell = false;
    public canChangeType = false;
    constructor(scene: Phaser.Scene, x: number, y: number, texture: string, xCord: number, yCord: number) {
        super(scene, x, y, texture);
        this.xCord = xCord;
        this.yCord = yCord;
        scene.add.existing(this);
    }

    protected getBody(): Physics.Arcade.Body {
        return this.body as Physics.Arcade.Body;
    }
}
