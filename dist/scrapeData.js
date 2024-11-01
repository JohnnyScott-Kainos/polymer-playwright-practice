"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var playwright_1 = require("playwright");
var fs_1 = require("fs");
var path_1 = require("path");
(function () { return __awaiter(void 0, void 0, void 0, function () {
    var browser, page, clothingUrls, result, _i, _a, _b, category, url, products, filePath;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0: return [4 /*yield*/, playwright_1.chromium.launch()];
            case 1:
                browser = _c.sent();
                return [4 /*yield*/, browser.newPage()];
            case 2:
                page = _c.sent();
                clothingUrls = {
                    "Men's Outerwear": "https://shop.polymer-project.org/list/mens_outerwear",
                    "Ladies Outerwear": "https://shop.polymer-project.org/list/ladies_outerwear",
                    "Men's T-Shirts": "https://shop.polymer-project.org/list/mens_tshirts",
                    "Ladies T-Shirts": "https://shop.polymer-project.org/list/ladies_tshirts"
                };
                result = {};
                _i = 0, _a = Object.entries(clothingUrls);
                _c.label = 3;
            case 3:
                if (!(_i < _a.length)) return [3 /*break*/, 7];
                _b = _a[_i], category = _b[0], url = _b[1];
                return [4 /*yield*/, page.goto(url)];
            case 4:
                _c.sent();
                return [4 /*yield*/, page.evaluate(function () {
                        return Array.from(document.querySelectorAll('.product')).map(function (product) {
                            var _a, _b, _c, _d, _e;
                            return ({
                                name: (_b = (_a = product.querySelector('.product-name')) === null || _a === void 0 ? void 0 : _a.textContent) === null || _b === void 0 ? void 0 : _b.trim(),
                                price: parseFloat((_d = (_c = product.querySelector('.product-price')) === null || _c === void 0 ? void 0 : _c.textContent) === null || _d === void 0 ? void 0 : _d.replace('$', '').trim()),
                                url: (_e = product.querySelector('a')) === null || _e === void 0 ? void 0 : _e.getAttribute('href')
                            });
                        });
                    })];
            case 5:
                products = _c.sent();
                result[category] = {
                    expectedUrl: url,
                    expectedProductCount: products.length,
                    products: products
                };
                _c.label = 6;
            case 6:
                _i++;
                return [3 /*break*/, 3];
            case 7: return [4 /*yield*/, browser.close()];
            case 8:
                _c.sent();
                filePath = path_1.default.resolve(__dirname, '../testData/data.json');
                fs_1.default.writeFileSync(filePath, JSON.stringify(result, null, 2));
                console.log("Data has been saved to ".concat(filePath));
                return [2 /*return*/];
        }
    });
}); })();
