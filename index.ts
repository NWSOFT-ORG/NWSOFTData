import express, {Express, Request, Response} from "express";
import {createRoutes} from "./src/projects";
import https from "https";
import http from "http";
import fs from "fs";

const app: Express = express();
const port = 8000;
const options = {
  key: fs.readFileSync('cert.key').toString(),
  cert: fs.readFileSync('cert.pem').toString()
};

app.get("/", function (req: Request, res: Response) {
    res.sendFile(__dirname + "/public/index.html");
});

createRoutes(app);

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

app.use(function (req: Request, res: Response) {
    res.status(404);

    // Respond with html page
    if (req.accepts("html")) {
        res.sendFile(__dirname + "/public/404.html");
        return;
    }

    // Respond with json
    if (req.accepts("json")) {
        res.json({error: "Not found"});
        return;
    }

    // Default to plain-text. send()
    res.type("txt").send("Not found");
});

const serverHttps = https.createServer(options, app);
serverHttps.listen(443, "0.0.0.0", () => {
    console.log("server starting on port : " + port);
});

app.listen(80, "0.0.0.0");