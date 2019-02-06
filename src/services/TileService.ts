import { CellManager } from "../managers/CellManager";
import { Dot } from "../tiles/Dot";
import { TILE } from "../types/Tile";

export class TileService {
    static instantiate(tile: TILE, position = CellManager.DEFAULT_ORIGIN) {
        switch (tile) {
            case "DOT":
                return new Dot(position);
        }
    }
}
