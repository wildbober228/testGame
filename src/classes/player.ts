import {Actor} from './actor';
import ICellCoords = CellCoords.ICellCoords;

const LEFT = "LEFT";
const RIGHT = "RIGHT";
const UP = "UP";
const DOWN = "DOWN";

const STANDARD_PLAYER_TEXTURE = "player";
const COOL_PLAYER_TEXTURE = "coolPlayer";

export class Player extends Actor {

    private upgradePlayer = false;

    canMove(playerCoords: ICoords, transition: string): boolean {
        switch (transition) {
            case LEFT:
                if (playerCoords.x === 0) return false;
                break;
            case RIGHT:
                if (playerCoords.x === 9) return false;
                break;
            case UP:
                if (playerCoords.y === 0) return false;
                break;
            case DOWN:
                if (playerCoords.y === 9) return false;
                break;
        }
        return true;
    }

    checkObstacle(playerCoords: ICoords, cellStorage: [ICellCoords[]], transition: string): boolean {
        const playerX = playerCoords.x;
        const playerY = playerCoords.y;

        if (this.upgradePlayer) {
            return false;
        }

        if (transition === DOWN && !cellStorage[playerY + 1][playerX].cell.canMove) {
            return true;
        }

        if (transition === UP && !cellStorage[playerY - 1][playerX].cell.canMove) {
            return true;
        }

        if (transition === LEFT && !cellStorage[playerY][playerX - 1].cell.canMove) {
            return true;
        }

        if (transition === RIGHT && !cellStorage[playerY][playerX + 1].cell.canMove) {
            return true;
        }

        return false;
    }

    changePlayerColor(playerCoords: ICoords, cellStorage: [ICellCoords[]], transition: string): void {
        const playerX = playerCoords.x;
        const playerY = playerCoords.y;

        if (transition === DOWN && cellStorage[playerY + 1][playerX].cell.isColorCell) {
            const tint = cellStorage[playerY + 1][playerX].cell.tint
            this.setTintFill(tint, tint, tint, tint)
        }

        if (transition === UP && cellStorage[playerY - 1][playerX].cell.isColorCell) {
            const tint = cellStorage[playerY - 1][playerX].cell.tint
            this.setTintFill(tint, tint, tint, tint)
        }

        if (transition === LEFT && cellStorage[playerY][playerX - 1].cell.isColorCell) {
            const tint = cellStorage[playerY][playerX - 1].cell.tint
            this.setTintFill(tint, tint, tint, tint)
        }

        if (transition === RIGHT && cellStorage[playerY][playerX + 1].cell.isColorCell) {
            const tint = cellStorage[playerY][playerX + 1].cell.tint
            this.setTintFill(tint, tint, tint, tint)
        }
    }

    changePlayerType(playerCoords: ICoords, cellStorage: [ICellCoords[]]): void {
        const playerX = playerCoords.x;
        const playerY = playerCoords.y;

        if (cellStorage[playerY][playerX].cell.canChangeType) {
            this.upgradePlayer = !this.upgradePlayer;
        }
        this.setTexture(this.upgradePlayer ? COOL_PLAYER_TEXTURE : STANDARD_PLAYER_TEXTURE);

    }

    setNewCoordsX(playerCoords: ICoords, x: number): void {
        playerCoords.x += x;
    }

    setNewCoordsY(playerCoords: ICoords, y: number): void {
        playerCoords.y += y;
    }

    constructor(scene: Phaser.Scene, x: number, y: number, playerCoords: ICoords, cellStorage: [ICellCoords[]]) {
        super(scene, x, y, 'player');
        this.getBody().setSize(30, 30);
        this.getBody().setOffset(8, 0);
        const step = 55;

        scene.input.keyboard?.on("keyup", (event: any) => {
            if (event.keyCode === 37) { //LEFT
                if (this.canMove(playerCoords, LEFT)) {
                    if (!this.checkObstacle(playerCoords, cellStorage, LEFT)) {
                        this.x -= step;
                        this.changePlayerColor(playerCoords, cellStorage, LEFT);
                        this.setNewCoordsX(playerCoords, -1);
                    }
                }
            } else if (event.keyCode === 39) { //RIGHT
                if (this.canMove(playerCoords, RIGHT)) {
                    if (!this.checkObstacle(playerCoords, cellStorage, RIGHT)) {
                        this.x += step;
                        this.changePlayerColor(playerCoords, cellStorage, RIGHT);
                        this.setNewCoordsX(playerCoords, 1);
                    }
                }
            } else if (event.keyCode === 38) { //UP
                if (this.canMove(playerCoords, UP)) {
                    if (!this.checkObstacle(playerCoords, cellStorage, UP)) {
                        this.y -= step;
                        this.changePlayerColor(playerCoords, cellStorage, UP);
                        this.setNewCoordsY(playerCoords, -1);
                    }
                }

            } else if (event.keyCode === 40) { //DOWN
                if (this.canMove(playerCoords, DOWN)) {
                    if (!this.checkObstacle(playerCoords, cellStorage, DOWN)) {
                        this.y += step;
                        this.changePlayerColor(playerCoords, cellStorage, DOWN);
                        this.setNewCoordsY(playerCoords, 1);
                    }
                }
            }
            else if (event.keyCode === 32) { //SPACE
                this.changePlayerType(playerCoords, cellStorage);
            }
        });
    }
}
