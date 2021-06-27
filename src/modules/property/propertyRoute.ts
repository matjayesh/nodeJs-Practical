import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { PropertyController } from "./propertyController";
import { PropertyMiddleware } from "./propertyMiddleware";
import { PropertyModel } from "./propertyModel";
const router: Router = Router();
const propertyController = new PropertyController();
const propertyMiddleware = new PropertyMiddleware();
const v: Validator = new Validator();
const middleware = new Middleware();

router.use([(req, res, next) => {
    req.byPassRoutes = ["/visitors"]; // Add Urls to by pass auth protection
    next();
}, middleware.authenticateUser]);

// Create property API
const propertyCreateRoutePath = [v.validate(PropertyModel), propertyMiddleware.validateImageSize,
propertyController.createProperty];
router.post("/create", propertyCreateRoutePath);

// Create list all properties
const propertyListRoutePath = [propertyController.getProperties];
router.get("/list", propertyListRoutePath);

// Create favorite properties
const propertyFavoriteRoutePath = [propertyMiddleware.checkAlreadyFavorites, propertyController.setFavorite];
router.post("/set-favorite", propertyFavoriteRoutePath);

// list all properties for visitors
const propertyVisitorListRoutePath = [propertyController.getPropertiesVisitores];
router.get("/visitors", propertyVisitorListRoutePath);

export const PropertyRoute: Router = router;
