import { SendEmailArgs } from "Lib/Infra/External/Email/TypeSetting/SendEmailArgs";
import { SendBulkEmailArgs } from "Lib/Infra/External/Email/TypeSetting/SendBulkEmailArgs";

export interface IEmailDriver {
  sendEmail(sendEmailArgs: SendEmailArgs): Promise<void>;

  sendBulkEmail(sendBulkEmailArgs: SendBulkEmailArgs): Promise<void>;
}
