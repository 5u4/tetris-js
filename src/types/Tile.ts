import { Color } from "./Color";
import { Direction } from "./Direction";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    readonly movement: { [key in Direction]: () => void };
    getPosition(): BoardPoint;
}

export type TILE = "DOT";
