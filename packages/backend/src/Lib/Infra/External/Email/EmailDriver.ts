import nodemailer from 'nodemailer';

import {
  IEmailDriver,
  SendBulkEmailArgs,
  SendEmailArgs,
} from 'Lib/Infra/External/Email/';
import { emailConfig } from 'Config/emailConfig';

export class EmailDriver implements IEmailDriver {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.initializeEmailProvider();
  }

  private initializeEmailProvider() {
    switch (emailConfig.provider) {
      case 'gmail':
        this.transporter = nodemailer.createTransport({
          service: emailConfig.gmail.service,
          auth: {
            user: emailConfig.gmail.user,
            pass: emailConfig.gmail.pass,
          },
        });
        break;
      case 'mailtrap':
        this.transporter = nodemailer.createTransport({
          host: emailConfig.mailTrap.host,
          port: emailConfig.mailTrap.port,
          auth: {
            user: emailConfig.mailTrap.user,
            pass: emailConfig.mailTrap.pass,
          },
        });
        break;
      case 'mailgun':
        this.transporter = nodemailer.createTransport({
          host: emailConfig.mailgun.host,
          port: emailConfig.mailgun.port,
          auth: {
            user: emailConfig.mailgun.user,
            pass: emailConfig.mailgun.pass,
          },
          logger: true,
          debug: true,
        });
        break;
      case 'sendgrid':
        this.transporter = nodemailer.createTransport({
          host: emailConfig.sendgrid.host,
          port: emailConfig.sendgrid.port,
          auth: {
            user: emailConfig.sendgrid.user,
            pass: emailConfig.sendgrid.pass,
          },
        });
        break;
      default:
        throw new Error('Unsupported email provider');
    }
  }

  public async sendBulkEmail(sendBulkEmailArgs: SendBulkEmailArgs) {
    console.log(sendBulkEmailArgs);
    await null;
  }

  public async sendEmail({ to, subject, body }: SendEmailArgs) {
    const htmlContent = `<h3>${body}</h3>`;
    const senderDetails = {
      email: emailConfig.emailFromEmail,
      name: emailConfig.emailFromName,
    };

    if (this.transporter) {
      await this.transporter.sendMail({
        from: `${senderDetails.name} <${senderDetails.email}>`,
        to,
        subject,
        html: htmlContent,
      });
    } else {
      throw new Error('No valid email provider configured');
    }
  }
}
