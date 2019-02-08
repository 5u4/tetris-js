import { Color } from "./Color";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    getPositions(): BoardPoint[];
}

export type Shape = "DOT" | "O" | "I" | "S" | "Z" | "L" | "J" | "T";
