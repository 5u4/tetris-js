import { BACKGROUND_COLOR } from "../constants/colors";
import { GraphicService } from "../services/GraphicService";
import { fshader } from "../shaders/fshader";
import { vshader } from "../shaders/vshader";
import { BoardManager } from "./BoardManager";
import { CellManager } from "./CellManager";

export class GameManager {
    private gl: WebGLRenderingContext;
    private boardManager: BoardManager;
    private cellManager: CellManager;
    private graphicService: GraphicService;
    private dropSpeed = GameManager.INITIAL_DROP_SPEED;

    private static readonly INITIAL_DROP_SPEED = 600;
    private static readonly BTN_DISABLE_CLASS_NAME = "is-disabled";
    private static readonly PLAYING_TEXT = "PLAYING";

    private readonly TILE_MOVEMENT = {
        ArrowLeft: () => { this.cellManager.moveLeft(); },
        ArrowRight: () => { this.cellManager.moveRight(); },
        ArrowDown: () => { this.cellManager.softDrop(); },
    };

    static readonly CANVAS_HEIGHT = 620;
    static readonly CANVAS_WIDTH = 320;

    private constructor() { }

    /**
     * Initialize the game environment
     */
    static init() {
        const instance = new GameManager();

        instance.initWebGL();
        instance.graphicService = new GraphicService(instance.gl);
        instance.boardManager = new BoardManager(instance.graphicService);
        instance.cellManager = new CellManager(instance.graphicService);
        instance.initGame();
        instance.boardManager.drawBoard();

        instance.registrateKeys();

        return instance;
    }

    /**
     * Main render loop trigger
     */
    render() {
        const renderLoop = () => {
            this.cellManager.generateTile();

            setTimeout(() => {
                this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
                window.requestAnimationFrame(renderLoop);
                this.cellManager.softDrop();
                this.renderer();
            }, this.dropSpeed);
        };

        renderLoop();
    }

    /**
     * Registrate action keys on html elements
     */
    private registrateKeys() {
        document.getElementById("body")
            .addEventListener("keydown", this.tileMovementHandler());

        const startButton = document.getElementById("start");

        startButton.addEventListener("click", this.startHandler(startButton));
    }

    /**
     * Handle tile movement
     */
    private tileMovementHandler() {
        return (ev: KeyboardEvent) => {
            const handle = this.TILE_MOVEMENT[ev.key];

            if (handle === undefined) {
                return;
            }

            handle();

            this.rerender();
        };
    }

    /**
     * Start the rendering loop
     *
     * @param startButton The start button that is going to be disabled
     */
    private startHandler(startButton: HTMLElement) {
        return () => {
            this.render();
            startButton.classList.add(GameManager.BTN_DISABLE_CLASS_NAME);
            startButton.textContent = GameManager.PLAYING_TEXT;
        };
    }

    /**
     * Immediately render again
     */
    private rerender() {
        this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
        this.renderer();
    }

    /**
     * The main rendering logic
     */
    private renderer() {
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
     * Extract webgl from canvas
     */
    private initWebGL() {
        this.gl = (<HTMLCanvasElement>document.getElementById("board")).getContext("webgl");
    }
}
