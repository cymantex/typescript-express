import {ServerOptions} from "./Server";

export const serverOptions: ServerOptions = {
    port: parseInt(process.env.PORT, 10) || 8080,
};