import { emailConfig } from 'Config/index';
import { EmailDriver } from 'Lib/Infra/External/Email/EmailDriver';
import { EmailProvider } from 'Lib/Infra/External/Email/EmailProvider';

export class EmailProviderFactory {
  public static build(): EmailProvider {
    if (EmailProviderFactory.getCurrentProvider() === 'mailtrap') {
      return new EmailProvider(new EmailDriver());
    }
    return new EmailProvider(new EmailDriver());
  }

  public static getCurrentProvider() {
    return emailConfig.provider;
  }
}
