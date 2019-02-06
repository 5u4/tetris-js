import { BACKGROUND_COLOR } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";
import { fshader } from "../shaders/fshader";
import { vshader } from "../shaders/vshader";
import { BoardManager } from "./BoardManager";
import { CellManager } from "./CellManager";

export class GameManager {
    gl: WebGLRenderingContext;
    private boardManager: BoardManager;
    private cellManager: CellManager;
    private graphicService: GraphicService;

    private static readonly WARNING_TEXT = "Your browser doesn't support the HTML5 canvas element";
    private static readonly FRAMERATE = 1000 / 30;

    static readonly CANVAS_HEIGHT = 620;
    static readonly CANVAS_WIDTH = 320;

    private constructor() { }

    /**
     * Initialize the game environment
     */
    static init() {
        const instance = new GameManager();

        instance.initCanvas();
        instance.graphicService = new GraphicService(instance.gl);
        instance.boardManager = new BoardManager(instance.graphicService);
        instance.cellManager = new CellManager(instance.graphicService);
        instance.initGame();
        instance.boardManager.drawBoard();

        return instance;
    }

    /**
     * Main render loop trigger
     */
    render() {
        this.cellManager.generateTile();

        const renderLoop = () => {
            setTimeout(() => {
                window.requestAnimationFrame(renderLoop);
                this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
                this.renderer();
            }, GameManager.FRAMERATE);
        };

        renderLoop();
    }

    /**
     * The main rendering logic
     */
    private renderer() {
        this.cellManager.softDrop();
        this.cellManager.drawCurrentTile();
        this.boardManager.drawBoard();
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
    private initCanvas() {
        const canvas = document.createElement("canvas");
        const warningText = document.createTextNode(GameManager.WARNING_TEXT);

        canvas.width = GameManager.CANVAS_WIDTH;
        canvas.height = GameManager.CANVAS_HEIGHT;

        canvas.appendChild(warningText);
        document.getElementById("gameframe").prepend(canvas);

        this.gl = canvas.getContext("webgl");

        return canvas;
    }
}
