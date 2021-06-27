import { Request, Response } from "express";
import { FileUpload } from "../../helpers/fileUpload";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { PropertyUtils } from "./propertyUtils";

export class PropertyController {
    private propertyUtils: PropertyUtils = new PropertyUtils();

    public createProperty = async (req: Request, res: Response) => {
        const { id } = req._user;
        const getUnitData = await this.propertyUtils.getUnitConversationData
            (req.body.areaUnit, req.body.carpetArea) as any;
        const { name, description, address, locality, price,
            bedroom, bath, areaUnit, carpetArea } = req.body;
        const propertyData: Json = {
            name, description, address, locality, price,
            bedroom, bath, areaUnit, carpetArea, userId: id,
            areaSqFt: getUnitData.areaSqFt, areaSqYd: getUnitData.areaSqYd,
            areaSqMt: getUnitData.areaSqMt,
        };
        const propertyImages = [];
        const resPropertyData = await this.propertyUtils.addProperty(propertyData);
        if (req.files && req.files.images) {
            if (!req.files.images.length) {
                const reqFile = req.files.images;
                req.files.images = [];
                req.files.images.push(reqFile);
            }
            for (const image of req.files.images) {
                const imagesData = await FileUpload.fileUpload(image, "property_image");
                const data = {
                    image: imagesData,
                    propertyId: resPropertyData.insertId,
                };
                propertyImages.push(data);
            }
        }
        if (propertyImages.length) {
            await this.propertyUtils.insertUploads(propertyImages);
        }
        const response = ResponseBuilder.successMessage(req.t("PROPERTY_CREATE_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getProperties = async (req: Request, res: Response) => {
        const propertyData = await this.propertyUtils.getProperties(req.query, false,  req._user.id);
        const { result, count } = propertyData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }

    public setFavorite = async (req: Request, res: Response) => {
        const { id } = req._user;
        const { propertyId } = req.body;
        const favoriteData: Json = {
            propertyId, userId: id,
        };
        const resfavoriteData = await this.propertyUtils.favoriteProperty(favoriteData);
        const response = ResponseBuilder.successMessage(req.t("FAVORITE_SUCCESSFULLY"));
        res.status(response.code).json(response);
    }

    public getPropertiesVisitores = async (req: Request, res: Response) => {
        const propertyData = await this.propertyUtils.getProperties(req.query, true);
        const { result, count } = propertyData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }

    public updatePropertyViewCount = async (req: Request, res: Response) => {
        const { propertyId } = req.body;
        const favoriteViewCount: Json = {
            viewCount: +req.propertyData.viewCount + 1,
        };
        const resfavoriteViewCount = await this.propertyUtils.updateViewCount(favoriteViewCount, propertyId);
        const response = ResponseBuilder.successMessage(req.t("VIEW_COUNT_UPDATED"));
        res.status(response.code).json(response);
    }
}
