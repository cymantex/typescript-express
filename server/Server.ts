import {log} from "./utils/log";
import http from "http";
import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import cors from "cors";
import {constants} from "./utils/constants";
import glob from "glob";
import compression from "compression";

export interface ServerOptions {
    port: number
}

export default class Server {
    private readonly app: express.Application;
    private readonly options: ServerOptions;
    private server: http.Server;

    public constructor(options: ServerOptions){
        this.app = express();
        this.options = options;
    }

    public async start(): Promise<http.Server> {
        this.addPlugins();
        this.addRoutes();
        return this.listen(this.options.port);
    }

    public async stop(): Promise<void> {
        if(this.server && this.server.listening){
            await this.server.close();
        }
    }

    private async listen(port: number): Promise<http.Server> {
        log.sectionTitle("Starting Server");

        return new Promise<http.Server>(resolve => {
            this.server = this.app.listen(port, () => {
                log.title(`The server is now running on port ${port}.\n`);
                log.apiPoints();
                log.endOfSection();
                resolve(this.server);
            });
        })
    }

    private addPlugins(): void {
        this.app.set("json spaces", 4);
        this.app.use(bodyParser.urlencoded({extended: true}));
        this.app.use(bodyParser.json());
        this.app.use(helmet());
        this.app.use(compression());
        this.app.use(cookieParser());
        this.app.use(cors());
    };

    private addRoutes(): void {
        glob.sync(`${constants.serverRoot}/routes/*.${constants.fileType}`)
            .forEach(routeFile => require(routeFile).default(this.app));

        if(constants.isProduction){
            this.app.use(express.static(`${constants.projectRoot}/client/build`));

            this.app.get("*", (req, res) => {
                res.sendFile(`${constants.projectRoot}/client/build/index.html`);
            });
        }
    };
}