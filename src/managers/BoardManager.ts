import { GraphicService } from "../services/GraphicService";

export class BoardManager {
    private gl: WebGLRenderingContext;
    private graphicService: GraphicService;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
        this.graphicService = new GraphicService(this.gl);
    }

    drawBoard() {
        //
    }
}
