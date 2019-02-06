import { LinkProgramError } from "../exceptions/LinkProgramError";
import { ShaderComileError } from "../exceptions/ShaderComileError";
import { colorToWebGLColor } from "../transformers/color";
import { pointToWebGLPoint } from "../transformers/point";
import { Color, DEFAULT_COLOR_ALPHA } from "../types/Color";
import { Point } from "../types/Point";

export class GraphicService {
    private gl: WebGLRenderingContext;
    private program: WebGLProgram;

    constructor(gl: WebGLRenderingContext) {
        this.gl = gl;
    }

    getGl() {
        return this.gl;
    }

    clearColor(color: Color) {
        const webglColor = colorToWebGLColor(color);

        this.gl.clearColor(
            webglColor.R, webglColor.G, webglColor.B,
            webglColor.A || DEFAULT_COLOR_ALPHA
        );
    }

    clear(mask: GLbitfield) {
        this.gl.clear(mask);
    }

    createShader(type: GLenum, source: string) {
        const shader = this.gl.createShader(type);

        this.gl.shaderSource(shader, source);
        this.gl.compileShader(shader);

        if (!this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS)) {
            throw new ShaderComileError(this.gl.getShaderInfoLog(shader));
        }

        this.gl.attachShader(this.program, shader);
    }

    initProgram() {
        this.program = this.gl.createProgram();
    }

    useProgram() {
        this.gl.linkProgram(this.program);

        if (!this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS)) {
            throw new LinkProgramError(this.gl.getProgramInfoLog(this.program));
        }

        this.gl.useProgram(this.program);
    }

    drawLine(from: Point, to: Point, color: Color) {
        const webglColor = colorToWebGLColor(color);
        const webglFrom = pointToWebGLPoint(from);
        const webglTo = pointToWebGLPoint(to);

        const lineVerticies = [
            webglFrom.x, webglFrom.y, webglColor.R, webglColor.G, webglColor.B,
            webglTo.x, webglTo.y, webglColor.R, webglColor.G, webglColor.B,
        ];

        this.drawPrepare(lineVerticies);

        this.gl.drawArrays(this.gl.LINES, 0, 2);
    }

    drawRectangleOutline(topLeft: Point, bottomRight: Point, color: Color) {
        const vertices = this.calculateRectangleVertices(topLeft, bottomRight, color);

        this.drawPrepare(vertices);

        this.gl.drawArrays(this.gl.LINE_LOOP, 0, 4);
    }

    private calculateRectangleVertices(topLeft: Point, bottomRight: Point, color: Color) {
        const webglTopLeft = pointToWebGLPoint(topLeft);
        const webglBottomRight = pointToWebGLPoint(bottomRight);
        const webglColor = colorToWebGLColor(color);

        return [
            webglTopLeft.x, webglTopLeft.y, webglColor.R, webglColor.G, webglColor.B,
            webglTopLeft.x, webglBottomRight.y, webglColor.R, webglColor.G, webglColor.B,
            webglBottomRight.x, webglBottomRight.y, webglColor.R, webglColor.G, webglColor.B,
            webglBottomRight.x, webglTopLeft.y, webglColor.R, webglColor.G, webglColor.B,
        ];
    }

    private drawPrepare(vertices: number[]) {
        this.initBuffer(this.gl.ARRAY_BUFFER, vertices, this.gl.STATIC_DRAW);

        this.attribPointer("vertPosition", 2, 5, 0);
        this.attribPointer("vertColor", 3, 5, 2);
    }

    private initBuffer(target: GLenum, data: number[], usage: GLenum) {
        const buffer = this.gl.createBuffer();

        this.gl.bindBuffer(target, buffer);
        this.gl.bufferData(target, new Float32Array(data), usage);

        return buffer;
    }

    private attribPointer(name: string, size: GLint, stride: GLsizei, offset: GLintptr) {
        const index = this.gl.getAttribLocation(this.program, name);

        stride *= Float32Array.BYTES_PER_ELEMENT;
        offset *= Float32Array.BYTES_PER_ELEMENT;

        this.gl.vertexAttribPointer(index, size, this.gl.FLOAT, false, stride, offset);

        this.gl.enableVertexAttribArray(index);
    }
}
