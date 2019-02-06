import { WHITE } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";
import { CellManager } from "./CellManager";

export class BoardManager {
    private graphicService: GraphicService;

    static readonly BOARD_WIDTH_OFFSET = 10;
    static readonly BOARD_HEIGHT_OFFSET = 10;

    constructor(graphicService: GraphicService) {
        this.graphicService = graphicService;
    }

    drawBoard(color = WHITE) {
        this.graphicService.drawRectangleOutline({ x: 5, y: 5 }, { x: 315, y: 615 }, color);
        this.graphicService.drawRectangleOutline({ x: 10, y: 10 }, { x: 310, y: 610 }, color);

        /* Draw horizontal */
        for (let i = 1; i < 20; i++) {
            this.graphicService.drawLine(
                { x: 10, y: 10 + CellManager.CELL_DIMINSION * i },
                { x: 310, y: 10 + CellManager.CELL_DIMINSION * i },
                color
            );
        }

        /* Draw vertical */
        for (let i = 1; i < 10; i++) {
            this.graphicService.drawLine(
                { x: 10 + CellManager.CELL_DIMINSION * i, y: 10 },
                { x: 10 + CellManager.CELL_DIMINSION * i, y: 610 },
                color
            );
        }
    }
}
