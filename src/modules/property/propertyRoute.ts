import { Router } from "express";
import { Validator } from "../../validate";
import { PropertyController } from "./propertyController";
import { PropertyMiddleware } from "./propertyMiddleware";
import { PropertyModel } from "./propertyModel";
const router: Router = Router();
const propertyController = new PropertyController();
const propertyMiddleware = new PropertyMiddleware();
const v: Validator = new Validator();

// Create property API
const propertyCreateRoutePath = [v.validate(PropertyModel), propertyMiddleware.validateImageSize,
propertyController.createProperty];
router.post("/create", propertyCreateRoutePath);

// Create list all properties
const propertyListRoutePath = [propertyController.getProperties];
router.get("/list", propertyListRoutePath);

export const PropertyRoute: Router = router;
