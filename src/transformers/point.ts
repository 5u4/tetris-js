import { GameManager } from "../managers/GameManager";
import { Point, WebGLPoint } from "../types/Point";

export const pointToWebGLPoint = (point: Point): WebGLPoint => {
    const transform = (p: number, diminsion: number) => 2 * p / diminsion - 1;

    return {
        x: transform(point.x, GameManager.CANVAS_DIMENSION),
        y: - transform(point.y, GameManager.CANVAS_DIMENSION),
    };
};
