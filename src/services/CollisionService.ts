import { addPoints } from "../transformers/point";
import { Color } from "../types/Color";
import { BoardPoint, Point } from "../types/Point";
import { Tile } from "../types/Tile";

export class CollisionService {
    private collider: Color[][];
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;

        this.init();
    }

    getCollider() {
        return this.collider;
    }

    init() {
        this.collider = new Array<Color[]>(this.x);

        for (let i = 0; i < this.x; i++) {
            this.collider[i] = new Array<Color>(this.y);
        }
    }

    canMoveToward(from: Point, movement: Point) {
        return this.isEmpty(addPoints(from, movement));
    }

    registrate(tile: Tile) {
        const position = tile.getPosition();

        this.collider[position.x][position.y] = tile.color;
    }

    clearRows() {
        // TODO: Optimize
        const clearableRows = this.calculateClearableRows();

        clearableRows.forEach(row => {
            this.removeRow(row);
            this.pullDownAboveTiles(row);
        });
    }

    private pullDownAboveTiles(row: number) {
        for (let y = row; y >= 0; y--) {
            for (let x = 0; x < this.x; x++) {
                this.collider[x][y] = y === 0 ? undefined : this.collider[x][y - 1];
            }
        }
    }

    private removeRow(row: number) {
        for (let x = 0; x < this.x; x++) {
            this.collider[x][row] = undefined;
        }
    }

    private calculateClearableRows() {
        const clearableRows = [];

        for (let y = 0; y < this.y; y++) {
            let clearable = true;

            for (let x = 0; x < this.x; x++) {
                if (this.isEmpty({ x, y })) {
                    clearable = false;
                    break;
                }
            }

            if (clearable) {
                clearableRows.push(y);
            }
        }

        return clearableRows;
    }

    private isEmpty(boardPoint: BoardPoint) {
        return this.collider[boardPoint.x][boardPoint.y] === undefined;
    }
}
