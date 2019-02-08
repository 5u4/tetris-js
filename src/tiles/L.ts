import { ORANGE } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class L implements Tile {
    private positions: BoardPoint[];

    readonly color = ORANGE;

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
            { x: origin.x - 1, y: origin.y + 1 },
            { x: origin.x + 1, y: origin.y },
        ];
    }
}