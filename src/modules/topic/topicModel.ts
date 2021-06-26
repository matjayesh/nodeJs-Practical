import { IsNotEmpty, MaxLength, Validate } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";

export class TopicModel extends Model {

    @MaxLength(Constants.TOPIC_TITLE_MAX_LENGTH, { message: "ERR_MAX_LENGTH_TOPIC_TITLE" })
    @IsNotEmpty({ message: "ERR_TOPIC_TITLE_REQUIRED" })
    public title: string;

    constructor(body: any) {
        super();
        this.title = body.title;
    }
}
