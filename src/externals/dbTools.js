"use strict";
exports.__esModule = true;
exports.dbDefaults = exports.dbUtilities = exports.dbRequest = void 0;
var config_1 = require("./config");
var axios_1 = require("axios");
var dbRequest = /** @class */ (function () {
    function dbRequest() {
    }
    /**
     * All DB methods for handling Blogs
     */
    dbRequest.Blogs = {
        /**
         * Gets the specific blog, found by filtering for title
         * @param title The title of the blog in pretty format
         */
        get: function (title) {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/blog/" + title
            });
        },
        /**
         * Gets all blogs, no conditions
         */
        getAll: function () {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/blog/all"
            });
        },
        /**
         * Gets the IDs of the locations the blog is published in
         */
        getPublishedLocations: function (title) {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/blog/" + title + "/publishedIn"
            });
        },
        /**
         * Deleted the specific blog, found by filtering for title
         * @param title The title of the blog in pretty format
         */
        "delete": function (blogPost) {
            return axios_1["default"]({
                method: "POST",
                baseURL: config_1["default"].getBackendURL(),
                data: blogPost,
                responseType: "json",
                url: "/blog/delete/"
            });
        }
    };
    /**
     * All DB methods for handling tags
     */
    dbRequest.Tags = {
        /**
         * Gets the specific tag, found by filtering for id
         * @param id The id of the tag
         */
        get: function (id) {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/tag/" + id
            });
        },
        /**
         * Gets all tags, no conditions
         */
        getAll: function () {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/tag/all"
            });
        }
    };
    dbRequest.PublishLocations = {
        /**
         * Gets the specific tag, found by filtering for id
         * @param id The id of the tag
         */
        get: function (id) {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/publish/" + id
            });
        },
        /**
         * Gets all tags, no conditions
         */
        getAll: function () {
            return axios_1["default"]({
                method: "GET",
                baseURL: config_1["default"].getBackendURL(),
                responseType: "json",
                url: "/publish/all"
            });
        }
    };
    return dbRequest;
}());
exports.dbRequest = dbRequest;
var dbUtilities = /** @class */ (function () {
    function dbUtilities() {
    }
    // TODO Flesh this out for all characters
    /**
     * Converts a title to a URL compatible format
     */
    dbUtilities.serializeTitle = function (title) {
        var serializedTitle = title.split(" ").join("-");
        return serializedTitle;
    };
    // TODO Flesh this out for all characters
    /**
     * Converts a title from a URL compatible format to a readable format
     */
    dbUtilities.deserializeTitle = function (title) {
        var deserializedTitle = title.split("-").join(" ");
        return deserializedTitle;
    };
    /**
     * Converts a JS Date/Time to Database format
     */
    dbUtilities.serializeDate = function (date) {
        // toISOString converts to UTC, this offsets that. 
        // const timezoneOffset_hours = date.getTimezoneOffset() / 60;
        // date.setHours(date.getHours() - timezoneOffset_hours);
        return date.toISOString();
    };
    /**
     * Converts a database Date/Time to JS format
     */
    dbUtilities.deserializeDate = function (dateString) {
        // dateString is in format YYYY-MM-DDTHH:MM:SS.mmmZ
        var _a = dateString.split("T"), date = _a[0], time = _a[1];
        var _b = date.split("-"), year = _b[0], month = _b[1], day = _b[2];
        var _c = time.split(".")[0].split(":"), hour = _c[0], minute = _c[1], second = _c[2];
        // month -1 due to 0-based index
        return new Date(parseInt(year), parseInt(month) - 1, parseInt(day), parseInt(hour), parseInt(minute), parseInt(second));
    };
    /**
     * Converts a database Date/Time to pretty date format
     */
    dbUtilities.getPrettyDate = function (dateString, separator) {
        if (separator === void 0) { separator = "/"; }
        var date = this.deserializeDate(dateString);
        var prettyDate = "";
        prettyDate += date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
        prettyDate += separator;
        prettyDate += date.getDate() < 10 ? "0" + date.getDate() : date.getDate();
        prettyDate += separator;
        prettyDate += date.getFullYear();
        return prettyDate;
    };
    /**
     * Converts a database Date/Time to pretty time format
     */
    dbUtilities.getPrettyTime = function (dateString, showPeriodIndicator) {
        if (showPeriodIndicator === void 0) { showPeriodIndicator = true; }
        var date = this.deserializeDate(dateString);
        var prettyTime = "";
        prettyTime += date.getHours() % 12 + ":";
        prettyTime += date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
        if (showPeriodIndicator) {
            prettyTime += " " + (date.getHours() >= 12 ? "PM" : "AM");
        }
        return prettyTime;
    };
    return dbUtilities;
}());
exports.dbUtilities = dbUtilities;
var dbDefaults = /** @class */ (function () {
    function dbDefaults() {
    }
    /**
     * The default values for a new blogPost. Defined here for consistency across the web app.
     */
    dbDefaults.blogPost_default = function () {
        return {
            // No ID by default
            title: "BlogPost " + new Date().toISOString(),
            featured_image: "",
            excerpt: "",
            html: "",
            date_created: dbUtilities.serializeDate(new Date()),
            date_modified: dbUtilities.serializeDate(new Date())
        };
    };
    dbDefaults.tag_default = function () {
        return {
            tag_name: ""
        };
    };
    dbDefaults.publishing_location_default = function () {
        return {
            location_name: ""
        };
    };
    return dbDefaults;
}());
exports.dbDefaults = dbDefaults;
