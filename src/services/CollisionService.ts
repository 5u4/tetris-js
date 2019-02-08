import { addPoints } from "../transformers/point";
import { Color } from "../types/Color";
import { BoardPoint, Point } from "../types/Point";
import { Tile } from "../types/Tile";

export class CollisionService {
    private collider: Color[][];

    constructor(x: number, y: number) {
        this.collider = new Array<Color[]>(x);

        for (let i = 0; i < y; i++) {
            this.collider[i] = new Array<Color>(y);
        }
    }

    getCollider() {
        return this.collider;
    }

    canMoveToward(from: Point, movement: Point) {
        return this.isEmpty(addPoints(from, movement));
    }

    registrate(tile: Tile) {
        const position = tile.getPosition();

        this.collider[position.x][position.y] = tile.color;
    }

    private isEmpty(boardPoint: BoardPoint) {
        return this.collider[boardPoint.x][boardPoint.y] === undefined;
    }
}
