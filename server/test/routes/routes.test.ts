import "../serverTest";
import {expect} from "chai";
import {routes} from "../../utils/constants/routes";
import request, {Response} from "supertest";
import {httpCodes} from "../../utils/constants/httpCodes";

const checkSuccess = (response: Response) => {
    console.log(response.text);
    expect(response.status).to.be.equal(httpCodes.SUCCESS);
};

describe("Routes", function(){
    it("Should successfully GET all gettable routes.", () => {
        const gettableRoutes = [
            routes.sample
        ];

        return Promise.all(gettableRoutes.map(route => request(global.app).get(route)))
            .then(responses => responses.forEach(checkSuccess));
    });
});