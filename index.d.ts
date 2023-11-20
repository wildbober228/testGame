
interface Window {
    sizeChanged: () => void;
    game: Phaser.Game;
}

interface ICoords {
    x: number;
    y: number;
}

declare namespace CellCoords {
    interface ICellCoords {
        x: number;
        y: number;
        cell: import("./src/classes/cell").Cell;
    }
}


