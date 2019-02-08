import { MAGENTA } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class T implements Tile {
    private positions: BoardPoint[];

    readonly color = MAGENTA;
    readonly originIndex = 0;

    constructor(origin: BoardPoint) {
        this.positions = this.buildShape(origin);
    }

    getPositions() {
        return this.positions;
    }

    getOrigin() {
        return this.positions[this.originIndex];
    }

    rotateTo(finalPositions: BoardPoint[]) {
        this.positions = finalPositions;
    }

    private buildShape(origin: BoardPoint) {
        return [
            origin,
            { x: origin.x - 1, y: origin.y },
            { x: origin.x + 1, y: origin.y },
            { x: origin.x, y: origin.y + 1 },
        ];
    }
}
