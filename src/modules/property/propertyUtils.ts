import * as sql from "jm-ez-mysql";
import { Constants } from "../../config/constants";
import { FavoriteTable, Tables } from "../../config/tables";
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
        return { areaSqFt, areaSqYd, areaSqMt };
    }

    public async addProperty(propertyDetail: Json) {
        return await sql.insert(Tables.PROPERTY, propertyDetail);
    }

    public async insertUploads(imageData: JsonArray) {
        return await sql.insertMany(Tables.PROPERTY_IMAGE, imageData);
    }

    public async getProperties(filterData, isVisitor, userId ?: any) {
        const { skip, limit, locality, date, bedroom, maxPrice, minPrice } = filterData;
        const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);
        let condition = "0=0";
        let userCondition = "";
        const conditionValue = [pageLimit, page];
        if (date) {
            if (date === Constants.DATE_SELECTION.THIS_WEEK) {
                condition += ` AND WEEK(property.createdAt) = WEEK(NOW()) AND YEAR(property.createdAt) = YEAR(NOW())`;
            } else if (date === Constants.DATE_SELECTION.LAST_FIVE_WEEK) {
                condition += ` AND property.createdAt BETWEEN (NOW() - INTERVAL 4 WEEK) AND NOW()`;
            } else if (date === Constants.DATE_SELECTION.LAST_FIFTEEN_WEEK) {
                condition += ` AND property.createdAt BETWEEN (NOW() - INTERVAL 14 WEEK) AND NOW()`;
            }
        }
        if (bedroom) {
            condition += ` AND property.bedroom = ${+bedroom}`;
        }
        if (maxPrice && minPrice) {
            condition += ` AND property.price <= ${maxPrice} AND property.price >= ${minPrice}`;
        }
        if (locality && locality.length > 0) {
            condition += ` AND property.locality IN (${locality})`;
        }
        if (userId) {
            userCondition = ` AND favP.userId = ${userId}`;
        }
        const tables = `${Tables.PROPERTY} AS property
        LEFT JOIN ${Tables.PROPERTY_IMAGE} AS images ON images.propertyId = property.id
        LEFT JOIN ${Tables.FAVORITE_PROPERTY} AS favP ON favP.propertyId = property.id ${userCondition}`;
        const result = await sql.findAllWithCount(
            tables,
            [`DISTINCT property.id`],
            [
                `property.id,
                property.name,
                property.description,
                property.address,
                property.locality,
                property.price,
                property.bedroom,
                property.bath,
                property.areaSqFt,
                property.areaSqYd,
                property.areaSqMt,
                favP.id as favoriteId,
                CONCAT('[',
                IF(images.id != 'NULL',GROUP_CONCAT(DISTINCT
                    JSON_OBJECT(
                    'image',images.image
                    )
                ),''),
                ']') AS images
          `],
            condition,
            ` GROUP BY property.id ORDER BY property.id DESC LIMIT ? OFFSET ? `, conditionValue,
        );
        const resData = result.result.map((data) => {
            data.images = data && data.images ? Utils.formatStringObjectsToArrayObjects(data, "images") : null;
            data.isFavorite = data && data.favoriteId && !isVisitor ? true : false;
            return data;
        });
        return { result: resData, count: result.count };
    }

    public async favoriteProperty(favoriteDetail: Json) {
        return await sql.insert(Tables.FAVORITE_PROPERTY, favoriteDetail);
    }

    public async checkAlreadyFavorites(propertyId, userId) {
        const selectedFields =
            [`${FavoriteTable.ID}
        `];
        const result = await sql.first(
            Tables.FAVORITE_PROPERTY, selectedFields, `propertyId = ? AND userId = ?`, [propertyId, userId],
        );
        return result;
    }
}
