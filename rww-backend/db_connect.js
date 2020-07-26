"use strict";
exports.__esModule = true;
var pg_1 = require("pg");
var dotenv_1 = require("dotenv");
var DatabaseConnection = /** @class */ (function () {
    function DatabaseConnection() {
    }
    DatabaseConnection.getDatabaseConnection = function () {
        var result = dotenv_1.config();
        if (result.error) {
            throw result.error;
        }
        var port = Number.parseInt(process.env.DB_PORT || '5000');
        var username = process.env.DB_USER;
        var password = process.env.DB_PASS;
        var host = process.env.DB_HOST;
        var database = process.env.DB_NAME;
        var pool = new pg_1.Pool({
            user: username,
            host: host,
            database: database,
            password: password,
            port: port
        });
        return pool;
    };
    return DatabaseConnection;
}());
exports["default"] = DatabaseConnection;
