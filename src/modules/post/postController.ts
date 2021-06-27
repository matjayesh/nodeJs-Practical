import { Request, Response } from "express";
import { FileUpload } from "../../helpers/fileUpload";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { PostUtils } from "./postUtils";

export class PostController {
    private postUtils: PostUtils = new PostUtils();

    public createPost = async (req: Request, res: Response) => {
        const { id } = req._user;
        const { topicId, title, description } = req.body;
        const postData: Json = { topicId, title, description , userId: id};
        const postImages = [];
        const resPostData = await this.postUtils.addPost(postData);
        if (req.files && req.files.images) {
            if (!req.files.images.length) {
                const reqFile = req.files.images;
                req.files.images = [];
                req.files.images.push(reqFile);
            }
            for (const image of req.files.images) {
                const imagesData = await FileUpload.fileUpload(image, "images");
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

    public addComment = async (req: Request, res: Response) => {
        const { postId, comment } = req.body;
        const { id } = req._user;
        const commentData: Json = { postId, comment, userId: id };
        await this.postUtils.addComment(commentData);
        const response = ResponseBuilder.successMessage(req.t("COMMENT_ADDED_SUCCESS"));
        res.status(response.code).json(response);
    }

    public getPosts = async (req: Request, res: Response) => {
        const postsData = await this.postUtils.getPosts(req.query);
        const { result, count } = postsData;
        const response = ResponseBuilder.dataWithPaginate(result, count);
        res.status(response.code).json(response);
    }
}
