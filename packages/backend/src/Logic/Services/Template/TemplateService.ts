import { render } from 'mustache';
import emailConfirmationMail from 'Logic/Services/Template/templates/emailConfirmationMail';
import passwordResetEmail from 'Logic/Services/Template/templates/passwordResetMail';
import projectInviteLinkEmail from 'Logic/Services/Template/templates/projectInviteLinkMail';

export class TemplateService {
  public static getEmailVerificationTemplate(token: string) {
    return render(emailConfirmationMail, {
      token,
    });
  }

  public static getPasswordResetEmailTemplate(resetLink: string) {
    return render(passwordResetEmail, {
      resetLink,
    });
  }

  public static getProjectInvitationTemplate(invitationLink: string) {
    return render(projectInviteLinkEmail, {
      invitationLink,
    });
  }
}
