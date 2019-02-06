import { BoardManager } from "./BoardManager";

export class GameManager {
    gl: WebGLRenderingContext;
    private boardManager: BoardManager;

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
