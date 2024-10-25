import * as bcrypt from "bcrypt";
import { encryptionConfig } from "Config/index";

export class PasswordEncryptionHelper {
  public static hashPassword(password: string): string {
    return bcrypt.hashSync(password, encryptionConfig.saltRounds);
  }

  public static async verifyPassword(
    candidatePassword: string,
    hashedPassword: string
  ) {
    return await bcrypt.compare(candidatePassword, hashedPassword);
  }
}
