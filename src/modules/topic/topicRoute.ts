import { Router } from "express";
import { Validator } from "../../validate";
import { TopicController } from "./topicController";
import { TopicModel } from "./topicModel";
const router: Router = Router();
const v: Validator = new Validator();
const topicController = new TopicController();

// Create topic API
const topicCreateRoutePath = [v.validate(TopicModel), topicController.createTopic];
router.post("/create", topicCreateRoutePath);

// List topics with pagination API
const topicsListRoutePath = [topicController.getTopics];
router.get("/list", topicsListRoutePath);

export const TopicRoute: Router = router;
