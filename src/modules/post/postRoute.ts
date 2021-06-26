import { Router } from "express";
import { Validator } from "../../validate";
import { PostController } from "./postController";
import { CommentModel, PostModel } from "./postModel";
const router: Router = Router();
const v: Validator = new Validator();
const postController = new PostController();

// Create post api
const postCreateRoutePath = [v.validate(PostModel), postController.createPost];
router.post("/create", postCreateRoutePath);

// Create comment for post API
const commentAddRoutePath = [v.validate(CommentModel), postController.addComment];
router.post("/comments/create", commentAddRoutePath);

// List posts with pagination API
const postsListRoutePath = [postController.getPosts];
router.get("/list", postsListRoutePath);

export const PostRoute: Router = router;
