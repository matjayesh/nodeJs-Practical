import { Router } from "express";
import { Validator } from "../../validate";
import { PostController } from "./postController";
import { PostModel } from "./postModel";
const router: Router = Router();
const v: Validator = new Validator();
const postController = new PostController();

// Create post api
const postCreateRoutePath = [v.validate(PostModel), postController.createPost];
router.post("/create", postCreateRoutePath);

export const PostRoute: Router = router;
