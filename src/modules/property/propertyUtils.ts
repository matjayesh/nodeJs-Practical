import * as sql from "jm-ez-mysql";
import { Constants } from "../../config/constants";
import { Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";

export class PropertyUtils {

    public async getUnitConversationData(areaUnit, carpetArea) {
        let areaSqFt;
        let areaSqYd;
        let areaSqMt;
        if (areaUnit === Constants.CARPET_UNIT.SQ_FT) {
            areaSqFt = +carpetArea;
            areaSqFt = areaSqFt.toFixed(2);
            areaSqMt = (areaSqFt * Constants.SQFT_TO_SQMT).toFixed(2);
            areaSqYd = (areaSqFt * Constants.SQFT_TO_SQTD).toFixed(2);
        }
        if (areaUnit === Constants.CARPET_UNIT.SQ_YD) {
            areaSqYd = +carpetArea;
            areaSqYd = areaSqYd.toFixed(2);
            areaSqMt = (areaSqYd * Constants.SQYD_TO_SQMT).toFixed(2);
            areaSqFt = (areaSqYd * Constants.SQYD_TO_SQFT).toFixed(2);
        }
        if (areaUnit === Constants.CARPET_UNIT.SQ_MT) {
            areaSqMt = +carpetArea;
            areaSqMt = areaSqMt.toFixed(2);
            areaSqYd = (areaSqMt * Constants.SQMT_TO_SQYD).toFixed(2);
            areaSqFt = (areaSqMt * Constants.SQMT_TO_SQFT).toFixed(2);
        }
        return {areaSqFt, areaSqYd, areaSqMt};
    }

    public async addProperty(propertyDetail: Json) {
        return await sql.insert(Tables.PROPERTY, propertyDetail);
    }

    public async insertUploads(imageData: JsonArray) {
        return await sql.insertMany(Tables.PROPERTY_IMAGE, imageData);
    }
}
