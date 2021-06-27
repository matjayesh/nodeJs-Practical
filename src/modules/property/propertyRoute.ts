import { Router } from "express";
import { Middleware } from "../../middleware";
import { Validator } from "../../validate";
import { PropertyController } from "./propertyController";
import { PropertyMiddleware } from "./propertyMiddleware";
import { PropertyModel, PropertyViewModel, SetPropertyFavoriteModel } from "./propertyModel";
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
const propertyFavoriteRoutePath = [v.validate(SetPropertyFavoriteModel)
    , propertyMiddleware.checkAlreadyFavorites, propertyController.setFavorite];
router.post("/set-favorite", propertyFavoriteRoutePath);

// list all properties for visitors
const propertyVisitorListRoutePath = [propertyController.getPropertiesVisitores];
router.get("/visitors", propertyVisitorListRoutePath);

// Update property view count
const propertyViewCountRoutePath = [v.validate(PropertyViewModel), propertyMiddleware.checkPropertyExists,
propertyController.updatePropertyViewCount];
router.post("/update-view-count", propertyViewCountRoutePath);

export const PropertyRoute: Router = router;
