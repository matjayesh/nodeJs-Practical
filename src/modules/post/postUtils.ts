import * as sql from "jm-ez-mysql";
import { Tables } from "../../config/tables";
import { Utils } from "../../helpers/utils";

export class PostUtils {

  public async addPost(postDetail: Json) {
    return await sql.insert(Tables.POSTS, postDetail);
  }

  public async insertUploads(imageData: JsonArray) {
    return await sql.insertMany(Tables.UPLOADS, imageData);
  }
}
