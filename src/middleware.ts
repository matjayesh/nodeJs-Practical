
import { Jwt } from "./helpers/jwt";
import { ResponseBuilder } from "./helpers/responseBuilder";
import { UserUtils } from "./modules/user/userUtils";

export class Middleware {
    private userUtils: UserUtils = new UserUtils();

    public authenticateUser = async (req, res, next) => {
        if (req.headers["x-auth-token"]) {
            const token = req.headers["x-auth-token"].replace("Bearer ", "");
            const decoded = Jwt.decodeAuthToken(
                token,
            );
            if (decoded && decoded.userId) {
                const user = await this.userUtils.getUserDataById(decoded.userId);
                if (user) {
                    req._user = user;
                    next();
                } else {
                    const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                    res.status(error.code).json({ error: error.error });
                    return;
                }
            } else {
                const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
                res.status(error.code).json({ error: error.error });
                return;
            }
        } else {
            const error = ResponseBuilder.unauthorizedRequest(req.t("ERR_UNAUTH"));
            res.status(error.code).json({ error: error.error });
            return;
        }
    }
}
