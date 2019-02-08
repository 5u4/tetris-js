import { CellManager } from "../managers/CellManager";
import { Dot } from "../tiles/Dot";
import { Direction } from "../types/Direction";
import { BoardPoint } from "../types/Point";
import { Shape, Tile } from "../types/Tile";

export class TileService {
    private static readonly TILE_GENERATOR: { [tile in Shape]: (position: BoardPoint) => Tile } = {
        DOT: (position: BoardPoint) => new Dot(position),
    };

    static instantiate(tile: Shape, position = { ...CellManager.DEFAULT_ORIGIN }) {
        return TileService.TILE_GENERATOR[tile](position);
    }

    static movement(tile: Tile): { [key in Direction]: () => void } {
        return {
            down: () => { tile.getPositions().forEach(position => position.y++); },
            left: () => { tile.getPositions().forEach(position => position.x--); },
            right: () => { tile.getPositions().forEach(position => position.x++); },
        };
    }
}
