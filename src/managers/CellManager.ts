import { DOWN, LEFT, RIGHT } from "../constants/points";
import { CollisionService } from "../services/CollisionService";
import { GraphicService } from "../services/GraphicService";
import { TileService } from "../services/TileService";
import { boardPointToRectPoints } from "../transformers/point";
import { Tile } from "../types/Tile";

export class CellManager {
    private graphicService: GraphicService;
    private currentTile: Tile = undefined;
    private collisionService: CollisionService;

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
        this.currentTile = TileService.instantiate("DOT");
    }

    drawCurrentTile() {
        if (this.currentTile === undefined) {
            return;
        }

        const rectangle = boardPointToRectPoints(this.currentTile.getPosition());

        this.graphicService.drawRectangle(rectangle.topLeft, rectangle.bottomRight, this.currentTile.color);
    }

    drawStaticTiles() {
        const collider = this.collisionService.getCollider();

        collider.forEach((colors, i) => {
            colors.forEach((color, j) => {
                const rectangle = boardPointToRectPoints({ x: i, y: j });

                this.graphicService.drawRectangle(rectangle.topLeft, rectangle.bottomRight, color);
            });
        });
    }

    softDrop() {
        if (this.canDrop() === true) {
            this.currentTile.movement.down();
            return;
        }

        this.land();
        this.generateTile();
    }

    moveLeft() {
        if (this.canMoveLeft() === false) {
            return;
        }

        this.currentTile.movement.left();
    }

    moveRight() {
        if (this.canMoveRight() === false) {
            return;
        }

        this.currentTile.movement.right();
    }

    private canDrop() {
        if (this.currentTile === undefined) {
            return false;
        }

        /* Check if reached bottom */
        if (this.currentTile.getPosition().y >= CellManager.VERTICAL_CELL_NUMBER - 1) {
            return false;
        }

        if (this.collisionService.canMoveToward(this.currentTile.getPosition(), DOWN) === false) {
            return false;
        }

        return true;
    }

    private canMoveLeft() {
        if (this.currentTile === undefined) {
            return false;
        }

        /* Check if reach left border */
        if (this.currentTile.getPosition().x <= 0) {
            return false;
        }

        if (this.collisionService.canMoveToward(this.currentTile.getPosition(), LEFT) === false) {
            return false;
        }

        return true;
    }

    private canMoveRight() {
        if (this.currentTile === undefined) {
            return false;
        }

        /* Check if reach right border */
        if (this.currentTile.getPosition().x >= CellManager.HORIZONTAL_CELL_NUMBER - 1) {
            return false;
        }

        if (this.collisionService.canMoveToward(this.currentTile.getPosition(), RIGHT) === false) {
            return false;
        }

        return true;
    }

    private land() {
        if (this.currentTile === undefined) {
            return;
        }

        this.collisionService.registrate(this.currentTile);
        this.currentTile = undefined;
    }
}
