import { Color } from "./Color";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    getPositions(): BoardPoint[];
}

export type Shape = "DOT";
