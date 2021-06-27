import { ResponseBuilder } from "../../helpers/responseBuilder";
import { PropertyUtils } from "./propertyUtils";

export class PropertyMiddleware {

    private propertyUtils: PropertyUtils = new PropertyUtils();

    public validateImageSize = async (req, res, next) => {
        if (req.files && req.files.images && req.files.images.length > 5) {
            const error = ResponseBuilder.badRequest(req.t("ERR_IMAGE_VALIDATION"));
            return res.status(error.code).json({ error: error.error });
        }
        next();
    }

    public checkAlreadyFavorites = async (req, res, next) => {
        const { propertyId } = req.body;
        const { id } = req._user;
        const result = await this.propertyUtils.checkAlreadyFavorites(propertyId, id);
        if (result && result.id) {
            const error = ResponseBuilder.badRequest(req.t("ALREADY_FAVORITE"));
            res.status(error.code).json({ error: error.error });
            return;
        } else {
            next();
        }
    }
}
