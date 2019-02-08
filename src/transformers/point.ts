import { BoardManager } from "../managers/BoardManager";
import { CellManager } from "../managers/CellManager";
import { GameManager } from "../managers/GameManager";
import { BoardPoint, Point, WebGLPoint } from "../types/Point";

export const transformPixelToWebGLPosition = (p: number, diminsion: number) => {
    return 2 * p / diminsion - 1;
};

export const BOARD_WIDTH_OFFSET_IN_WEBGL = 0.0625;

export const BOARD_HEIGHT_OFFSET_IN_WEBGL = 0.032258065;

export const CELL_WIDTH_IN_WEBGL = 0.09375;

export const CELL_HEIGHT_IN_WEBGL = 0.048387097;

export const addPoints = (point: Point, ...addingPoints: Point[]) => {
    const sum = { ...point };

    addingPoints.forEach(p => {
        sum.x += p.x;
        sum.y += p.y;
    });

    return sum;
};

export const pointToWebGLPoint = (point: Point): WebGLPoint => {
    return {
        x: transformPixelToWebGLPosition(point.x, GameManager.CANVAS_WIDTH),
        y: - transformPixelToWebGLPosition(point.y, GameManager.CANVAS_HEIGHT),
    };
};

export const pointToWebGLRectPoints = (point: Point) => {
    return {
        topLeft: pointToWebGLPoint(point),
        bottomRight: pointToWebGLPoint({
            x: point.x + CellManager.CELL_DIMINSION - 1,
            y: point.y + CellManager.CELL_DIMINSION - 1,
        }),
    };
};

export const boardPointToPoint = (point: BoardPoint): Point => {
    return {
        x: point.x * CellManager.CELL_DIMINSION + BoardManager.BOARD_WIDTH_OFFSET,
        y: point.y * CellManager.CELL_DIMINSION + BoardManager.BOARD_HEIGHT_OFFSET,
    };
};

export const boardPointToRectPoints = (point: BoardPoint) => {
    return {
        topLeft: boardPointToPoint(point),
        bottomRight: boardPointToPoint({
            x: point.x + 1,
            y: point.y + 1,
        }),
    };
};
