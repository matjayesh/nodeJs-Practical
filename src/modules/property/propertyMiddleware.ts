import { ResponseBuilder } from "../../helpers/responseBuilder";

export class PropertyMiddleware {

    public validateImageSize = async (req, res, next) => {
        if (req.files && req.files.images && req.files.images.length > 5) {
            const error = ResponseBuilder.badRequest(req.t("ERR_IMAGE_VALIDATION"));
            return res.status(error.code).json({ error: error.error });
        }
        next();
    }

}
