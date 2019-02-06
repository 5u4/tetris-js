import { BACKGROUND_COLOR } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";
import { fshader } from "../shaders/fshader";
import { vshader } from "../shaders/vshader";
import { BoardManager } from "./BoardManager";

export class GameManager {
    gl: WebGLRenderingContext;
    private boardManager: BoardManager;
    private graphicService: GraphicService;

    private static readonly WARNING_TEXT = "Your browser doesn't support the HTML5 canvas element";

    static readonly CANVAS_DIMENSION = 625;

    private constructor() { }

    /**
     * Initialize the game environment
     */
    static init() {
        const instance = new GameManager();

        instance.initCanvas(GameManager.CANVAS_DIMENSION);
        instance.boardManager = new BoardManager(instance.gl);
        instance.graphicService = new GraphicService(instance.gl);
        instance.initGame();

        return instance;
    }

    /**
     * Main render loop trigger
     */
    render() {
        const renderLoop = () => {
            this.renderer();
            window.requestAnimationFrame(renderLoop);
        };

        renderLoop();
    }

    /**
     * The main rendering logic
     */
    private renderer() {
        //
    }

    /**
     * Initialize the game
     */
    private initGame() {
        this.graphicService.clearColor(BACKGROUND_COLOR);
        this.graphicService.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        this.graphicService.initProgram();

        this.graphicService.createShader(this.gl.VERTEX_SHADER, vshader);
        this.graphicService.createShader(this.gl.FRAGMENT_SHADER, fshader);

        this.graphicService.useProgram();
    }

    /**
     * Create a canvas and extract webgl from it
     *
     * @param dimension The dimension of the canvas
     */
    private initCanvas(dimension: number) {
        const canvas = document.createElement("canvas");
        const warningText = document.createTextNode(GameManager.WARNING_TEXT);

        canvas.width = dimension;
        canvas.height = dimension;

        canvas.appendChild(warningText);
        document.getElementsByTagName("body")[0].appendChild(canvas);

        this.gl = canvas.getContext("webgl");

        return canvas;
    }
}
