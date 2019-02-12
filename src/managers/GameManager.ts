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
    private status: "pausing" | "playing" = "pausing";

    private static readonly INITIAL_DROP_SPEED = 600;
    private static readonly START_BUTTON_ID = "start";
    private static readonly BTN_DISABLE_CLASS_NAME = "is-disabled";
    private static readonly PLAYING_TEXT = "PLAYING";
    private static readonly START_TEXT = "START";
    private static readonly QUIT_KEY: string = "q";
    private static readonly RESTART_KEY: string = "r";

    private readonly TILE_MOVEMENT = {
        "ArrowLeft": () => { this.cellManager.moveLeft(); },
        "ArrowRight": () => { this.cellManager.moveRight(); },
        "ArrowDown": () => { this.cellManager.softDrop(); },
        "ArrowUp": () => { this.cellManager.rotate(); },
        " ": () => { this.cellManager.fastDrop(); },
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
        this.startRender();
    }

    /**
     * Draw the frame
     */
    private draw() {
        this.cellManager.drawCurrentTile();
        this.cellManager.drawStaticTiles();
        this.boardManager.drawBoard();
    }

    /**
     * Start rendering
     */
    private startRender() {
        const frame = () => {
            setTimeout(() => {
                this.renderProcess(frame);
            }, this.dropSpeed);
        };

        frame();
    }

    /**
     * The rendering process
     *
     * @param frame The repeated function
     */
    private renderProcess(frame: () => void) {
        if (this.status !== "playing") {
            return;
        }

        this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
        window.requestAnimationFrame(frame);

        if (this.cellManager.hasCurrentTile() === false) {
            this.cellManager.generateTile();
        } else {
            this.cellManager.softDrop();
        }

        if (this.cellManager.hasLost()) {
            this.status = "pausing";
            const startButton = document.getElementById(GameManager.START_BUTTON_ID);
            startButton.classList.remove(GameManager.BTN_DISABLE_CLASS_NAME);
            startButton.textContent = GameManager.START_TEXT;
            this.boardManager.drawBoard();
            return;
        }

        this.draw();
    }

    /**
     * Immediately render again
     */
    private redraw() {
        this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
        this.draw();
    }

    /**
     * Registrate action keys on html elements
     */
    private registrateKeys() {
        const body = document.getElementById("body");

        body.addEventListener("keydown", this.tileMovementHandler());

        const startButton = document.getElementById(GameManager.START_BUTTON_ID);

        startButton.addEventListener("click", this.startHandler(startButton));

        body.addEventListener("keydown", this.quitHandler(startButton));
        body.addEventListener("keydown", this.restartHandler());
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

            this.redraw();
        };
    }

    /**
     * Handle start action
     *
     * @param startButton
     */
    private startHandler(startButton: HTMLElement) {
        return () => {
            if (this.status !== "pausing") {
                return;
            }

            this.reset();
            this.startRender();
            startButton.classList.add(GameManager.BTN_DISABLE_CLASS_NAME);
            startButton.textContent = GameManager.PLAYING_TEXT;

            this.status = "playing";
        };
    }

    /**
     * Handle quit action
     *
     * @param startButton
     */
    private quitHandler(startButton: HTMLElement) {
        return (ev: KeyboardEvent) => {
            if (this.status !== "playing") {
                return;
            }

            if (ev.key !== GameManager.QUIT_KEY) {
                return;
            }

            this.reset();
            startButton.classList.remove(GameManager.BTN_DISABLE_CLASS_NAME);
            startButton.textContent = GameManager.START_TEXT;

            this.status = "pausing";
        };
    }

    /**
     * Handle restart game action
     */
    private restartHandler() {
        return (ev: KeyboardEvent) => {
            if (this.status !== "playing") {
                return;
            }

            if (ev.key !== GameManager.RESTART_KEY) {
                return;
            }

            this.reset();
        };
    }

    /**
     * Reset the game
     */
    private reset() {
        this.cellManager.clear();
        this.redraw();
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
