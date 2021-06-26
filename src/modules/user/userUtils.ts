import * as sql from "jm-ez-mysql";
import { Tables, UserTable } from "../../config/tables";

export class UserUtils {
    /** should be use for signup users
     *
     * @param userDetail Json
     */
    public async createUser(userDetail: Json) {
        const newUser = await sql.insert(`${Tables.USER}`, userDetail);
        return newUser.insertId;
    }

    /** should be used for get user detail
     *
     * @param email string
     */
    public async getUserDetailByEmail(email: string) {
        const result = await sql.first(
            Tables.USER,
            [`${UserTable.ID},
            ${UserTable.EMAIL},
            ${UserTable.PASSWORD},
            ${UserTable.NAME}
            `],
            `${UserTable.EMAIL} = ?`, [email],
        );
        return result;
    }

    public async getUserDataById(id: number) {
        const selectedFields =
            [`${UserTable.ID},
            ${UserTable.EMAIL},
            ${UserTable.NAME}
        `];
        const result = await sql.first(
            Tables.USER, selectedFields, `id = ?`, [id],
        );
        return result;
    }
}
