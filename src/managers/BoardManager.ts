import { WHITE } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";
import { BACKGROUND_COLOR } from "./../constants/colors";
import { CellManager } from "./CellManager";

export class BoardManager {
    private graphicService: GraphicService;

    static readonly BOARD_WIDTH_OFFSET = 10;
    static readonly BOARD_HEIGHT_OFFSET = 10;

    constructor(graphicService: GraphicService) {
        this.graphicService = graphicService;
    }

    drawBoard(color = WHITE) {
        this.graphicService.drawRectangle({ x: 0, y: 0 }, { x: 320, y: 10 }, BACKGROUND_COLOR);

        this.graphicService.drawRectangleOutline({ x: 5, y: 5 }, { x: 315, y: 615 }, color);
        this.graphicService.drawRectangleOutline({ x: 10, y: 10 }, { x: 310, y: 610 }, color);

        /* Draw horizontal lines */
        for (let i = 1; i < CellManager.VERTICAL_CELL_NUMBER; i++) {
            this.graphicService.drawLine(
                { x: 10, y: 10 + CellManager.CELL_DIMINSION * i },
                { x: 310, y: 10 + CellManager.CELL_DIMINSION * i },
                color
            );
        }

        /* Draw vertical lines */
        for (let i = 1; i < CellManager.HORIZONTAL_CELL_NUMBER; i++) {
            this.graphicService.drawLine(
                { x: 10 + CellManager.CELL_DIMINSION * i, y: 10 },
                { x: 10 + CellManager.CELL_DIMINSION * i, y: 610 },
                color
            );
        }
    }
}
