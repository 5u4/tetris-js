import { GraphicService } from "../services/GraphicService";
import { TileService } from "../services/TileService";
import { boardPointToRectPoints } from "../transformers/point";
import { BoardPoint } from "../types/Point";
import { Tile } from "../types/Tile";

export class CellManager {
    private graphicService: GraphicService;
    private currentTile: Tile = undefined;

    static readonly DEFAULT_ORIGIN: BoardPoint = { x: 4, y: -1 };
    static readonly CELL_DIMINSION = 30;

    constructor(graphicService: GraphicService) {
        this.graphicService = graphicService;
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

    softDrop() {
        this.currentTile.movement.down();
    }

    moveLeft() {
        this.currentTile.movement.left();
    }

    moveRight() {
        this.currentTile.movement.right();
    }
}
