import { DOWN, LEFT, RIGHT } from "../constants/points";
import { CollisionService } from "../services/CollisionService";
import { GraphicService } from "../services/GraphicService";
import { TileService } from "../services/TileService";
import { boardPointToRectPoints } from "../transformers/point";
import { BoardPoint } from "../types/Point";
import { Shape, Tile } from "../types/Tile";

export class CellManager {
    private graphicService: GraphicService;
    private currentTile: Tile = undefined;
    private collisionService: CollisionService;
    private static readonly availableCells: Shape[] = ["O", "I", "S", "Z", "L", "J", "T"];
    private static readonly numberOfAvailableCells = CellManager.availableCells.length;

    static readonly DEFAULT_ORIGIN: BoardPoint = { x: 4, y: 0 };
    static readonly HORIZONTAL_CELL_NUMBER = 10;
    static readonly VERTICAL_CELL_NUMBER = 20;

    static readonly CELL_DIMINSION = 30;

    constructor(graphicService: GraphicService) {
        this.graphicService = graphicService;
        this.collisionService = new CollisionService(
            CellManager.HORIZONTAL_CELL_NUMBER, CellManager.VERTICAL_CELL_NUMBER
        );
    }

    generateTile() {
        this.currentTile = TileService.instantiate(this.generateRandomCell());
    }

    hasCurrentTile() {
        return this.currentTile !== undefined;
    }

    drawCurrentTile() {
        if (this.currentTile === undefined) {
            return;
        }

        this.currentTile.getPositions().forEach(position => {
            const rectangle = boardPointToRectPoints(position);

            this.graphicService.drawRectangle(rectangle.topLeft, rectangle.bottomRight, this.currentTile.color);
        });
    }

    drawStaticTiles() {
        const collider = this.collisionService.getCollider();

        collider.forEach((colors, i) => {
            colors.forEach((color, j) => {
                if (color === undefined) {
                    return;
                }

                const rectangle = boardPointToRectPoints({ x: i, y: j });

                this.graphicService.drawRectangle(rectangle.topLeft, rectangle.bottomRight, color);
            });
        });
    }

    clear() {
        this.currentTile = undefined;
        this.collisionService.init();
    }

    softDrop() {
        if (this.canDrop() === true) {
            TileService.movement(this.currentTile).down();
            return;
        }

        this.land();
    }

    fastDrop() {
        while (this.canDrop() === true) {
            TileService.movement(this.currentTile).down();
        }

        this.land();
    }

    moveLeft() {
        if (this.canMoveLeft() === false) {
            return;
        }

        TileService.movement(this.currentTile).left();
    }

    moveRight() {
        if (this.canMoveRight() === false) {
            return;
        }

        TileService.movement(this.currentTile).right();
    }

    rotate() {
        const rotatedPositions = TileService.rotate(this.currentTile);

        if (this.collisionService.canRotateTo(rotatedPositions) === false) {
            return;
        }

        this.currentTile.rotateTo(rotatedPositions);
    }

    private canDrop() {
        if (this.currentTile === undefined) {
            return false;
        }

        for (const position of this.currentTile.getPositions()) {
            /* Check if reached bottom */
            if (position.y >= CellManager.VERTICAL_CELL_NUMBER - 1) {
                return false;
            }

            if (this.collisionService.canMoveToward(position, DOWN) === false) {
                return false;
            }
        }

        return true;
    }

    private canMoveLeft() {
        if (this.currentTile === undefined) {
            return false;
        }

        for (const position of this.currentTile.getPositions()) {
            /* Check if reach left border */
            if (position.x <= 0) {
                return false;
            }

            if (this.collisionService.canMoveToward(position, LEFT) === false) {
                return false;
            }
        }

        return true;
    }

    private canMoveRight() {
        if (this.currentTile === undefined) {
            return false;
        }

        for (const position of this.currentTile.getPositions()) {
            /* Check if reach right border */
            if (position.x >= CellManager.HORIZONTAL_CELL_NUMBER - 1) {
                return false;
            }

            if (this.collisionService.canMoveToward(position, RIGHT) === false) {
                return false;
            }
        }

        return true;
    }

    private land() {
        if (this.currentTile === undefined) {
            return;
        }

        this.collisionService.registrate(this.currentTile);
        this.collisionService.clearRows();
        this.currentTile = undefined;
    }

    private generateRandomCell() {
        return CellManager.availableCells[Math.floor(Math.random() * CellManager.numberOfAvailableCells)];
    }
}
