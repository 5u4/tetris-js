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

    private readonly TILE_MOVEMENT = {
        "ArrowLeft": () => { this.cellManager.moveLeft(); },
        "ArrowRight": () => { this.cellManager.moveRight(); },
        "ArrowDown": () => { this.cellManager.softDrop(); },
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
        instance.cellManager.generateTile(); // TODO: Remove

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
        this.graphicService.clear(this.gl.COLOR_BUFFER_BIT);
        window.requestAnimationFrame(frame);
        this.cellManager.softDrop();
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
        document.getElementById("body")
            .addEventListener("keydown", this.tileMovementHandler());
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
