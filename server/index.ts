import Server from "./Server";
import {serverOptions} from "./settings";
import {log} from "./utils/log";

const server = new Server(serverOptions);

server.start().catch(async err => {
    log.error(err);
    await server.stop();
});