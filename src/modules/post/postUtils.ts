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

  public async addComment(commentDetail: Json) {
    return await sql.insert(Tables.COMMENTS, commentDetail);
  }

  // tslint:disable-next-line: ban-types
  public async getPosts(filterData) {
    const { skip, limit } = filterData;
    const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);
    const condition = "0=0";
    const conditionValue = [pageLimit, page];
    const tables = `${Tables.POSTS} AS posts
    LEFT JOIN ${Tables.UPLOADS} AS images ON images.postId = posts.id
    LEFT JOIN ${Tables.COMMENTS} AS comments ON comments.postId = posts.id
    JOIN ${Tables.TOPICS} AS topic ON topic.id = posts.topicId`;
    const result = await sql.findAllWithCount(
      tables,
      [`DISTINCT posts.id`],
      [`posts.id,
       posts.title,
       posts.description,
       CONCAT('[',
       IF(images.id != 'NULL',GROUP_CONCAT(DISTINCT
        JSON_OBJECT(
        'image',images.image
        )
       ),''),
      ']') AS images,
       CONCAT('[',
        IF(comments.id != 'NULL', GROUP_CONCAT(DISTINCT
           JSON_OBJECT(
          'id', comments.id,
          'comment', comments.comment,
          'createdAt', comments.createdAt
        )
        ), ''),
        ']') AS comments
          `],
          condition,
      ` GROUP BY posts.id ORDER BY posts.id DESC LIMIT ? OFFSET ? `, conditionValue,
    );
    const resData = result.result.map((data) => {
      data.images = data && data.images ? Utils.formatStringObjectsToArrayObjects(data, "images") : null;
      data.comments = data && data.comments ?
      Utils.formatStringObjectsToArrayObjects(data, "comments") : null;
      return data;
    });
    return { result: resData, count: result.count };
  }
}
