"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var projects_1 = require("./src/projects");
var app = (0, express_1["default"])();
var port = 8000;
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});
(0, projects_1.createRoutes)(app);
/*
Since this is the last non-error-handling
middleware use()d, we assume 404, as nothing else
responded.
 */
/*# Commands for testing
curl http://localhost:8000/notfound
curl http://localhost:8000/notfound -H "Accept: application/json"
curl http://localhost:8000/notfound -H "Accept: text/plain"
*/
app.use(function (req, res) {
    res.status(404);
    // Respond with html page
    if (req.accepts("html")) {
        res.sendFile(__dirname + "/public/404.html");
        return;
    }
    // Respond with json
    if (req.accepts("json")) {
        res.json({ error: "Not found" });
        return;
    }
    // Default to plain-text. send()
    res.type("txt").send("Not found");
});
app.listen(port, function () {
    console.log("[server]: Server is running at http://localhost:".concat(port));
});
//# sourceMappingURL=index.js.map