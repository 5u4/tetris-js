import { BLUE } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class J implements Tile {
    private positions: BoardPoint[];

    readonly color = BLUE;

    constructor(origin: BoardPoint) {
        this.positions = this.buildShape(origin);
    }

    getPositions() {
        return this.positions;
    }

    private buildShape(origin: BoardPoint) {
        return [
            origin,
            { x: origin.x - 1, y: origin.y },
            { x: origin.x + 1, y: origin.y },
            { x: origin.x + 1, y: origin.y + 1 },
        ];
    }
}
