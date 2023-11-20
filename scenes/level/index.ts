import {Scene} from 'phaser';
import {Player} from "../../src/classes/player";
import {ColorCell} from "../../src/classes/colorCell";
import {ObstacleCell} from "../../src/classes/obstacleCell";
import ICellCoords = CellCoords.ICellCoords;
import {EmptyCell} from "../../src/classes/emptyCell";

const sceneSize = 10;
const startX = window.innerWidth / 5;
const startY = 100;

function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

const generateLevel = (scene: Scene, cellStorage: ICellCoords[][]) => {

    cellStorage.pop();
    for (let yIndex = 0; yIndex < sceneSize; yIndex++) {
        const cellRow:ICellCoords[] = [];
        for (let xIndex = 0; xIndex < sceneSize; xIndex++) {
            cellRow.push({x: xIndex, y: yIndex, cell: new EmptyCell(scene, startX + 55 * xIndex, startY + 55 * yIndex, xIndex, yIndex)})
        }
        cellStorage.push(cellRow);
    }
}

const generateColorCell = (scene: Scene, cellStorage: ICellCoords[][]) => {
    for (let count = 0; count < 15; count++) {
        const xIndex = randomIntFromInterval(1, 9);
        const yIndex = randomIntFromInterval(1, 9);
        cellStorage[yIndex][xIndex] = {x: xIndex, y: yIndex, cell: new ColorCell(scene, startX + 55 * xIndex, startY + 55 * yIndex, xIndex, yIndex)};
    }
}

const generateObstacle = (scene: Scene, cellStorage: ICellCoords[][]) => {
    for (let count = 0; count < 15; count++) {
        const xIndex = randomIntFromInterval(1, 9);
        const yIndex = randomIntFromInterval(1, 9);
        cellStorage[yIndex][xIndex] = {x: xIndex, y: yIndex, cell: new ObstacleCell(scene, startX + 55 * xIndex, startY + 55 * yIndex, xIndex, yIndex)};
    }
}


export class Level extends Scene {
    private player!: Player;
    public playerCoords: ICoords = { x: 0, y: 0 };
    public cellStorage: [ICellCoords[]] = [[]];

    constructor() {
        super('level-scene');
    }

    create(): void {
        this.player = new Player(this, startX, startY, this.playerCoords, this.cellStorage);
        generateLevel(this, this.cellStorage);
        generateColorCell(this, this.cellStorage);
        generateObstacle(this, this.cellStorage);
        const text = this.add.text(startX, startY + 600, "use SPACE to change type" );
        text.setShadow(3, 3, 'rgba(0,0,0,0.5)', 2);
    }

    update(): void {
        this.player.update();
    }
}
