import {expect} from "chai";
import {startApp} from "../../setup/startApp";
import http from "http";
import {routes} from "../../utils/constants/routes";
import request, {Response} from "supertest";
import {httpCodes} from "../../utils/constants/httpCodes";
import settings from "../settings.json";

let server: http.Server = null;

const checkSuccess = (response: Response) => {
    console.log(response.text);
    expect(response.status).to.be.equal(httpCodes.SUCCESS);
};

before(async () => {
    server = await startApp(settings);
});

describe("Routes", function(){
    it("Should successfully GET all gettable routes.", () => {
        const gettableRoutes = [
            routes.sample
        ];

        return Promise.all(gettableRoutes.map(route => request(server).get(route)))
            .then(responses => responses.forEach(checkSuccess));
    });
});

after(() => {
    server.close();
});