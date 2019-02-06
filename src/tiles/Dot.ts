import { RED } from "../constants/colors";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class Dot implements Tile {
    private position: BoardPoint;

    readonly color = RED;

    constructor(position: BoardPoint) {
        this.position = position;
    }

    getPosition() {
        return this.position;
    }

    drop() {
        this.position.y++;
    }
}
