import { CellManager } from "../managers/CellManager";
import { Dot } from "../tiles/Dot";
import { I } from "../tiles/I";
import { J } from "../tiles/J";
import { L } from "../tiles/L";
import { O } from "../tiles/O";
import { S } from "../tiles/S";
import { T } from "../tiles/T";
import { Z } from "../tiles/Z";
import { Direction } from "../types/Direction";
import { BoardPoint } from "../types/Point";
import { Shape, Tile } from "../types/Tile";

export class TileService {
    private static readonly TILE_GENERATOR: { [tile in Shape]: (position: BoardPoint) => Tile } = {
        DOT: (position: BoardPoint) => new Dot(position),
        O: (position: BoardPoint) => new O(position),
        I: (position: BoardPoint) => new I(position),
        S: (position: BoardPoint) => new S(position),
        Z: (position: BoardPoint) => new Z(position),
        L: (position: BoardPoint) => new L(position),
        J: (position: BoardPoint) => new J(position),
        T: (position: BoardPoint) => new T(position),
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
