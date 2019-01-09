import {constants} from "./constants/";
import {httpCodes} from "./constants/httpCodes";
import {Response} from "express";

const {
    SUCCESS,
    SOMETHING_WENT_WRONG,
    BAD_REQUEST,
    UNAUTHORIZED,
    METHOD_NOT_ALLOWED,
    NOT_FOUND,
    REDIRECT,
    CREATED
} = httpCodes;

const printErrorIfDevelopment = (err: any) => {
    if(constants.isDevelopment) console.error(err);
};

export default class ResponseHandler {
    res: Response;

    constructor(res: Response) {
        this.res = res;
    }

    redirect(page: string) {
        this.res.redirect(REDIRECT, page);
    };

    sendSuccess(data = {}) {
        this.res.send(data);
    };

    sendCreated() {
        this.res.sendStatus(CREATED);
    };

    sendNotFound(err: any) {
        printErrorIfDevelopment(err);
        this.res.status(NOT_FOUND).send(ResponseHandler.parseError(err));
    };

    sendUnauthorized(err: any) {
        printErrorIfDevelopment(err);
        this.res.sendStatus(UNAUTHORIZED);
    };

    sendMethodNotAllowed() {
        this.res.sendStatus(METHOD_NOT_ALLOWED);
    };

    sendSomethingWentWrong(err: any) {
        printErrorIfDevelopment(err);
        this.res.status(SOMETHING_WENT_WRONG).send(ResponseHandler.parseError(err));
    };

    sendBadRequest(err: any) {
        printErrorIfDevelopment(err);
        this.res.status(BAD_REQUEST).send(ResponseHandler.parseError(err));
    };

    private static parseError(err: any): any {
        return (err instanceof Error)
            ? ({
                message: err.message,
                name: err.name
            })
            : err;
    }

    handlePromiseResponse(promise: Promise<any>) {
        return promise
            .then(() => this.res.sendStatus(SUCCESS))
            .catch(err => this.sendSomethingWentWrong(err));
    };
}