import { RED } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class Dot implements Tile {
    private positions: BoardPoint[];

    readonly color = RED;

    constructor(origin: BoardPoint) {
        this.positions = [origin];
    }

    getPositions() {
        return this.positions;
    }
}
