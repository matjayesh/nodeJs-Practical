import { Request, Response } from "express";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { TopicUtils } from "./topicUtils";
export class TopicController {
    private topicUtils: TopicUtils = new TopicUtils();

    // Create new topic
    public createTopic = async (req: Request, res: Response) => {
        const { title } = req.body;
        const { id } = req._user;
        const topicData: Json = { title, userId: id };
        await this.topicUtils.addTopic(topicData);
        const response = ResponseBuilder.successMessage(req.t("SUCCESS_TOPIC_CREATE"));
        res.status(response.code).json(response);
    }

    // Get topics with pagination)
    public getTopics = async (req: Request, res: Response) => {
        const topicsData = await this.topicUtils.getTopics(req.query);
        const { result, count } = topicsData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }

}
