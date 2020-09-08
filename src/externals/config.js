"use strict";
exports.__esModule = true;
var dev_mode = true;
var Config = /** @class */ (function () {
    function Config() {
    }
    Config.getBackendURL = function () {
        if (dev_mode) {
            return 'http://localhost:5000';
        }
        else {
            return 'https://raisedwithwonder.com';
        }
    };
    Config.getFrontendURL = function () {
        if (dev_mode) {
            return 'http://localhost:3000';
        }
        else {
            return 'https://raisedwithwonder.com';
        }
    };
    return Config;
}());
exports["default"] = Config;
