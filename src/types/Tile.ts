import { Color } from "./Color";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    readonly originIndex: number;
    getOrigin(): BoardPoint;
    getPositions(): BoardPoint[];
    rotateTo(finalPositions: BoardPoint[]): void;
}

export type Shape = "DOT" | "O" | "I" | "S" | "Z" | "L" | "J" | "T";
