import { Color } from "./Color";
import { Direction } from "./Direction";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    getPosition(): BoardPoint;
    moveToward(direction: Direction): void;
}

export type TILE = "DOT";
