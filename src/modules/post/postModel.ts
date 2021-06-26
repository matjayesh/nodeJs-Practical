import { IsNotEmpty, MaxLength } from "class-validator";
import { Constants } from "../../config/constants";
import { Model } from "../../model";

export class PostModel extends Model {

    @MaxLength(Constants.POST_TITLE_MAX_LENGTH, { message: "ERR_MAX_LENGTH_POST_TITLE" })
    @IsNotEmpty({ message: "ERR_TITLE_REQUIRED" })
    public title: string;

    @IsNotEmpty({ message: "ERR_DESCRIPTION_REQUIRED" })
    public description: string;

    @IsNotEmpty({ message: "ERR_TOPIC_ID_REQUIRED" })
    public topicId: string;

    constructor(body: any) {
        super();
        this.title = body.title;
        this.description = body.description;
        this.topicId = body.topicId;
    }
}
