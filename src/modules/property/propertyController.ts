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
        const propertyData = await this.propertyUtils.getProperties(req.query);
        const { result, count } = propertyData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }
}
