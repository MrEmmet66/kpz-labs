"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.Triangle = exports.Square = exports.Circle = exports.Shape = void 0;
var Shape = /** @class */ (function () {
    function Shape(renderer) {
        this.renderer = renderer;
    }
    return Shape;
}());
exports.Shape = Shape;
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle(renderer, radius) {
        if (radius === void 0) { radius = 1; }
        var _this = _super.call(this, renderer) || this;
        _this.radius = radius;
        return _this;
    }
    Circle.prototype.draw = function () {
        this.renderer.renderShape('Circle');
    };
    Circle.prototype.resize = function (factor) {
        this.radius *= factor;
        console.log("Circle radius resized to ".concat(this.radius));
    };
    return Circle;
}(Shape));
exports.Circle = Circle;
var Square = /** @class */ (function (_super) {
    __extends(Square, _super);
    function Square(renderer, side) {
        if (side === void 0) { side = 1; }
        var _this = _super.call(this, renderer) || this;
        _this.side = side;
        return _this;
    }
    Square.prototype.draw = function () {
        this.renderer.renderShape('Square');
    };
    Square.prototype.resize = function (factor) {
        this.side *= factor;
        console.log("Square side length resized to ".concat(this.side));
    };
    return Square;
}(Shape));
exports.Square = Square;
var Triangle = /** @class */ (function (_super) {
    __extends(Triangle, _super);
    function Triangle(renderer, side) {
        if (side === void 0) { side = 1; }
        var _this = _super.call(this, renderer) || this;
        _this.side = side;
        return _this;
    }
    Triangle.prototype.draw = function () {
        this.renderer.renderShape('Triangle');
    };
    Triangle.prototype.resize = function (factor) {
        this.side *= factor;
        console.log("Triangle side length resized to ".concat(this.side));
    };
    return Triangle;
}(Shape));
exports.Triangle = Triangle;
