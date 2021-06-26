import express = require("express");

export class Routes {
  protected basePath: string;

  constructor(NODE_ENV: string) {
    switch (NODE_ENV) {
      case "development":
        this.basePath = "/app/public";
        break;
    }
  }

  public defaultRoute(req: express.Request, res: express.Response) {
    res.json({
      message: "",
    });
  }

  public path() {
    const router = express.Router();

    router.all("/*", (req, res) => {
      return res.status(404).json({
        error: req.t("ERR_URL_NOT_FOUND"),
      });
    });
    return router;
  }
}
