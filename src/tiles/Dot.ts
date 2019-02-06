import { RED } from "../constants/colors";
import { Direction } from "../types/Direction";
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

    moveToward(direction: Direction) {
        switch (direction) {
            case "down":
                this.position.y++;
                break;
            case "left":
                this.position.x--;
                break;
            case "right":
                this.position.x++;
        }
    }
}
