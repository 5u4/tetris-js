import { Color } from "./Color";
import { BoardPoint } from "./Point";

export interface Tile {
    readonly color: Color;
    getPosition(): BoardPoint;
    drop(): void;
}

export type TILE = "DOT";
