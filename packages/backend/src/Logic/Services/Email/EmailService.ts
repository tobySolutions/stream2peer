import { EmailProviderFactory, SendEmailArgs } from "Lib/Infra/External/Email";
import { TemplateService } from "Logic/Services/Template/TemplateService";
import {
  EMAIL_ACTIVATION_TOKEN_EMAIL_SUBJECT,
  PASSWORD_RESET_TOKEN_EMAIL_SUBJECT,
  PROJECT_INVITE_LINK,
} from "Api/Modules/Common/Helpers/Messages/SystemMessages";
import { SendPasswordResetLinkDtoType } from "Logic/Services/Email/TypeChecking/SendPasswordRestLinkDtoType";
import { SendAccountActivationEmailArgs } from "Logic/Services/Email/TypeChecking/SendAccountActivationEmailArgs";
import { SendProjectInviteLinkDtoType } from "Logic/Services/Email/TypeChecking/SendProjectInviteLinkDtoType";

export class EmailService {
  public static async sendAccountActivationEmail(
    sendAccountActivationEmailArgs: SendAccountActivationEmailArgs
  ) {
    const { userEmail, activationToken } = sendAccountActivationEmailArgs;
    const emailProvider = EmailProviderFactory.build();
    const emailTemplate =
      TemplateService.getEmailVerificationTemplate(activationToken);
    const activationEmailArgs: SendEmailArgs = {
      body: emailTemplate,
      subject: EMAIL_ACTIVATION_TOKEN_EMAIL_SUBJECT,
      to: userEmail,
    };
    await emailProvider.sendEmail(activationEmailArgs);
  }

  public static async sendPasswordResetLink(
    sendPasswordRestLinkArgs: SendPasswordResetLinkDtoType
  ) {
    const { userEmail, passwordResetLink } = sendPasswordRestLinkArgs;
    const emailProvider = EmailProviderFactory.build();

    const emailTemplate =
      TemplateService.getPasswordResetEmailTemplate(passwordResetLink);

    const passwordResetEmailArgs: SendEmailArgs = {
      body: emailTemplate,
      subject: PASSWORD_RESET_TOKEN_EMAIL_SUBJECT,
      to: userEmail,
    };

    await emailProvider.sendEmail(passwordResetEmailArgs);
  }

  public static async sendProjectInviteLink(
    sendProjectInviteLinkArgs: SendProjectInviteLinkDtoType
  ) {
    const { userId, projectInviteLink } = sendProjectInviteLinkArgs;
    const emailProvider = EmailProviderFactory.build();

    const emailTemplate =
      TemplateService.getProjectInvitationTemplate(projectInviteLink);

    const projectInviteEmailArgs: SendEmailArgs = {
      body: emailTemplate,
      subject: PROJECT_INVITE_LINK,
      to: userId,
    };

    await emailProvider.sendEmail(projectInviteEmailArgs);
  }

  public static sendEmail() {
    throw new Error("Method not implemented");
  }

  public static sendBulkEmail() {
    throw new Error("Method not implemented");
  }
}
