import { Request, Response } from "express";
import { FileUpload } from "../../helpers/fileUpload";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { PostUtils } from "./postUtils";

export class PostController {
    private postUtils: PostUtils = new PostUtils();

    public createPost = async (req: Request, res: Response) => {
        const { topicId, title, description } = req.body;
        const postData: Json = { topicId, title, description };
        const postImages = [];
        const resPostData = await this.postUtils.addPost(postData);
        if (req.files && req.files.images) {
            if (!req.files.images.length) {
                const reqFile = req.files.images;
                req.files.images = [];
                req.files.images.push(reqFile);
            }
            for (const image of req.files.images) {
                const imagesData = await FileUpload.fileUpload(image);
                const data = {
                    image: imagesData,
                    postId: resPostData.insertId,
                };
                postImages.push(data);
            }
        }
        if (postImages.length) {
            await this.postUtils.insertUploads(postImages);
        }
        const response = ResponseBuilder.successMessage(req.t("POST_CREATE_SUCCESS"));
        res.status(response.code).json(response);
    }
}
