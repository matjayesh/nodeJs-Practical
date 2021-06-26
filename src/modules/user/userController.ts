import { Request, Response } from "express";
import * as l10n from "jm-ez-l10n";
import { Jwt } from "../../helpers/jwt";
import { ResponseBuilder } from "../../helpers/responseBuilder";
import { SendEmail } from "../../helpers/sendEmail";
import { Utils } from "../../helpers/utils";
import { UserUtils } from "./userUtils";

export class UserController {
  private userUtils: UserUtils = new UserUtils();

  // login
  public login = async (req: Request, res: Response) => {
    const { _user } = req;
    const userData: Json = {
      userId: _user.id,
      email: _user.email,
    };
    const token = Jwt.getAuthToken(userData);
    userData.token = token;
    userData.name = _user.name;
    const response = ResponseBuilder.data(userData, req.t("LOGIN_SUCCESS"));
    res.status(response.code).json(response);
  }

  // signup
  public signup = async (req: Request, res: Response) => {
    const { email, password, name } = req.body;
    const newPassword = Utils.getEncryptedPassword(password);
    const userData = {
      email,
      password: newPassword,
      name,
    };
    await this.userUtils.createUser(userData);
    await this.sendWelcomeEmail(`welcome-email`, userData);
    const responseData = ResponseBuilder.data(req.t("ACCOUNT_CREATED"));
    res.status(responseData.code).json(responseData);
  }

  // Send welcome email to user
  public async sendWelcomeEmail(template: any, data: any) {
    await SendEmail.sendRawMail({
      template,
      replaceData: {
        "{USERNAME}": data.name,
      },
      to: [`${data.email}`],
      subject: l10n.t("WELCOME_MAIL_SUBJECT"),
    });
    return;
  }
}
