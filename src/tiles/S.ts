import { GREEN } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class S implements Tile {
    private positions: BoardPoint[];

    readonly color = GREEN;

    constructor(origin: BoardPoint) {
        this.positions = this.buildShape(origin);
    }

    getPositions() {
        return this.positions;
    }

    private buildShape(origin: BoardPoint) {
        return [
            origin,
            { x: origin.x, y: origin.y + 1 },
            { x: origin.x - 1, y: origin.y + 1 },
            { x: origin.x + 1, y: origin.y },
        ];
    }
}
