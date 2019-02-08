import { Dot } from "../tiles/Dot";
import { BoardPoint } from "../types/Point";
import { Tile, TILE } from "../types/Tile";

export class TileService {
    private static readonly TILE_GENERATOR: { [tile in TILE]: (position: BoardPoint) => Tile } = {
        DOT: (position: BoardPoint) => new Dot(position),
    };

    static instantiate(tile: TILE, position: BoardPoint = { x: 4, y: 0 }) {
        return TileService.TILE_GENERATOR[tile](position);
    }
}
