import {
  IEmailDriver,
  SendBulkEmailArgs,
  SendEmailArgs,
} from "Lib/Infra/External/Email/TypeSetting";

export class EmailProvider {
  constructor(private emailDriver: IEmailDriver) {}

  public async sendEmail(sendMailArgs: SendEmailArgs) {
    try {
      await this.emailDriver.sendEmail(sendMailArgs);
    } catch (sendEmailError) {
      console.log(
        "💣 EmailProvider.sendEmail sendEmailError ->",
        sendEmailError
      );
    }
  }

  public async sendBulkEmail(sendBulkMailArgs: SendBulkEmailArgs) {
    return this.emailDriver.sendBulkEmail(sendBulkMailArgs);
  }
}
