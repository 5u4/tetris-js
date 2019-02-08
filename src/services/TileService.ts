import { Dot } from "../tiles/Dot";
import { BoardPoint } from "../types/Point";
import { TILE } from "../types/Tile";

export class TileService {
    static instantiate(tile: TILE, position: BoardPoint = { x: 4, y: 0 }) {
        switch (tile) {
            case "DOT":
                return new Dot(position);
        }
    }
}
