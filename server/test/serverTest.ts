import {serverOptions} from "./settings";
import Server from "../Server";
import http from "http";

declare global {
    namespace NodeJS {
        interface Global {
            app: http.Server
        }
    }
}

const serverTest = new Server(serverOptions);
before(async () => {
    global.app = await serverTest.start();
});
after(async () => await serverTest.stop());