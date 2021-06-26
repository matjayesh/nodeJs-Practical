import bcryptjs = require("bcryptjs");
import { Constants } from "../config/constants";
import { Regex } from "../config/regex";

export class Utils {

    /**
     * @param page  per page
     * @param limit limit data of page
     */
    public static getPageSkipAndLimit(page: string, limit: string) {
        const limits = limit ? +limit : Constants.DEFAULT_LIMIT; // for paginate records
        const pages = page ? +page : Constants.DEFAULT_PAGE;
        return [pages > 1 ? (pages - 1) * limits : 0, limits];
    }

    public static isValidPassword(data: string) {
        const regex = Regex.PASSWORD;
        return regex.test(data);
    }

    public static compareHashPassword(password: string, existedPassword: string) {
        return bcryptjs.compareSync(password, existedPassword);
    }

    public static getEncryptedPassword = (password: string) => {
        return bcryptjs.hashSync(password, Constants.HASH_STRING_LIMIT);
    }

    // convert string object to array of objects
    public static formatStringObjectsToArrayObjects = (result: any, type: string) => {
        if (result[type]) {
            result[type] = JSON.parse(result[type]);
        } else {
            result[type] = [];
        }
        return result[type];
    }
}
