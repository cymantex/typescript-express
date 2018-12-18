import Request from "./Request";
import {Request as Req, Response} from "express";

export default class SampleRequest extends Request {
    constructor(req: Req, res: Response) {
        super(req, res);
    }

    async handleGet() {
        return this.responseHandler.sendSuccess("Sample");
    }
}