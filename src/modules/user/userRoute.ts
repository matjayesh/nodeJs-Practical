import { Router } from "express";
import { Validator } from "../../validate";
import { UserController } from "./userController";
import { UserMiddleware } from "./userMiddleware";
import { LoginModel, SignUpModel } from "./userModel";
const router: Router = Router();

const v: Validator = new Validator();
const userController = new UserController();
const userMiddleware = new UserMiddleware();

// sign-up API
const SignupRoutePath = [v.validate(SignUpModel), userMiddleware.checkEmailExists,
    userController.signup];
router.post("/signup", SignupRoutePath);

// login API
const LoginRoutePath = [ v.validate(LoginModel), userMiddleware.checkEmailAvailable,
    userMiddleware.validatePassword, userController.login];
router.post("/login", LoginRoutePath);

export const UserRoute: Router = router;
