export const encryptionConfig = {
  saltRounds: parseInt(process.env["BCRYPT_SALT_ROUNDS"]!, 10),
  customEncryptionKey: process.env["CUSTOM_ENCRYPTION_KEY"]!,
};
