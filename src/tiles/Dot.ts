import { RED } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class Dot implements Tile {
    private positions: BoardPoint[];

    readonly color = RED;
    readonly originIndex = 0;

    constructor(origin: BoardPoint) {
        this.positions = [origin];
    }

    getOrigin() {
        return this.positions[this.originIndex];
    }

    getPositions() {
        return this.positions;
    }

    rotateTo() {
        //
    }
}
