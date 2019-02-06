import { WHITE } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";

export class BoardManager {
    private gl: WebGLRenderingContext;
    private graphicService: GraphicService;

    static readonly CELL_DIMINSION = 30;

    constructor(graphicService: GraphicService) {
        this.graphicService = graphicService;
        this.gl = graphicService.getGl();
    }

    drawBoard(color = WHITE) {
        this.graphicService.drawRectangleOutline({ x: 5, y: 5 }, { x: 315, y: 615 }, color);
        this.graphicService.drawRectangleOutline({ x: 10, y: 10 }, { x: 310, y: 610 }, color);

        /* Draw horizontal */
        for (let i = 1; i < 20; i++) {
            this.graphicService.drawLine(
                { x: 10, y: 10 + BoardManager.CELL_DIMINSION * i },
                { x: 310, y: 10 + BoardManager.CELL_DIMINSION * i },
                color
            );
        }

        /* Draw vertical */
        for (let i = 1; i < 10; i++) {
            this.graphicService.drawLine(
                { x: 10 + BoardManager.CELL_DIMINSION * i, y: 10 },
                { x: 10 + BoardManager.CELL_DIMINSION * i, y: 610 },
                color
            );
        }
    }
}
