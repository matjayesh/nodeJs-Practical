import * as express from "express";
// tslint:disable-next-line: no-var-requires
require("express-async-errors");
import * as bodyParser from "body-parser";
import * as compression from "compression";
import * as dotenv from "dotenv";
import * as fileUpload from "express-fileupload";
import * as helmet from "helmet";
import * as l10n from "jm-ez-l10n";
import * as methodOverride from "method-override";
import * as morgan from "morgan";
import * as path from "path";
import { DB } from "./database";
import { Log } from "./helpers/logger";
import { Routes } from "./routes";

dotenv.config();
// Database
DB.init();
export class App {
  protected app: express.Application;
  private logger = Log.getLogger();
  constructor() {
    const NODE_ENV = process.env.NODE_ENV;
    const PORT = process.env.PORT as string;
    this.app = express();
    this.app.use(helmet());
    this.app.all("/*", (req, res, next) => {
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Request-Headers", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept,Access-Control-Allow-Headers, x-device-type, x-app-version, x-build-number, uuid, x-l10n-locale");
      res.header("Access-Control-Allow-Methods", "GET, POST, DELETE");
      if (req.method === "OPTIONS") {
        res.writeHead(200);
        res.end();
      } else {
        next();
      }
    });

    if (NODE_ENV === "development") {
      this.app.use(express.static(path.join(process.cwd(), "public")));
      this.app.use(morgan("dev"));
    } else {
      this.app.use(compression());
      this.app.use(express.static(path.join(process.cwd(), "dist"), { maxAge: "7d" }));
    }
    l10n.setTranslationsFile("en", "src/language/translation.en.json");
    this.app.use(l10n.enableL10NExpress);
    this.app.use(fileUpload({
      parseNested: true,
    }));
    this.app.use(bodyParser.json({ limit: "50mb" }));
    this.app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded
    this.app.use(bodyParser.json(), (error, req, res, next) => {
      if (error) {
        return res.status(400).json({ error: req.t("ERR_GENRIC_SYNTAX") });
      }
      next();
    });
    this.app.use(bodyParser.json({ type: "application/vnd.api+json" })); // parse application/vnd.api+json as json
    this.app.use(methodOverride());
    const routes = new Routes(NODE_ENV);
    this.app.use("/api", routes.path());
    this.app.use((err: any, req: any, res: any, next: () => void) => {
      if (err) {
        return res.status(400).json({ error: req.t("SOMETHING_WENT_WRONG") });
      }
    });
    this.app.listen(PORT, () => {
      this.logger.info(`The server is running in port localhost: ${process.env.PORT}`);
    });
  }
}
