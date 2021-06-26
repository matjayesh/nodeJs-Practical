import * as sql from "jm-ez-mysql";
import { Tables, TopicsTable } from "../../config/tables";
import { Utils } from "../../helpers/utils";
export class TopicUtils {

  public async addTopic(topicDetail: Json) {
    return await sql.insert(Tables.TOPICS, topicDetail);
  }

  public async getTopics(filterData: any) {
    const { skip, limit } = filterData;
    const [page, pageLimit] = Utils.getPageSkipAndLimit(skip, limit);
    const condition = "";
    const selectFields = [
      `${TopicsTable.ID} AS topicId`,
      `${TopicsTable.TITLE}`,
      `${TopicsTable.CREATED_AT}`,
    ];
    return await sql.findAllWithCount(Tables.TOPICS, [`${TopicsTable.ID}`], selectFields, condition, ` GROUP BY ${TopicsTable.ID} ORDER BY ${TopicsTable.CREATED_AT} ASC LIMIT ? OFFSET ? `, [pageLimit, page]);
  }
}
