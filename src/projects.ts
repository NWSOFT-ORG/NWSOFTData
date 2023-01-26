import * as fs from "fs";
import {Express, Request, Response} from "express";

export function loadProjects(): any {
    const file: number = fs.openSync(__dirname + "/projects.json", "r");
    const content: string = fs.readFileSync(file).toString();
    return JSON.parse(content);
}

export function createRoutes(app: Express): void {
    const projects = loadProjects();
    const keys: string[] = Object.keys(projects);
    const values: any[] = Object.values(projects);

    keys.forEach(function (item: string): void {
        app.get(`/${item}`, function (req: Request, res: Response): void {
            res.header("Allow-Access-Control-Origin", "*");
            res.json(values.at(keys.indexOf(item)));
        });
    });
}
