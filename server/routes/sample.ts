import {Express, Request, Response} from "express";
import {routes} from "../utils/constants/routes";
import SampleRequest from "../request/SampleRequest";

export default (app: Express) => {
    app.use(`${routes.sample}`, (req: Request, res: Response) => {
        return new SampleRequest(req, res).handle();
    });
};