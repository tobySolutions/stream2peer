export const jwtConfig = {
  jwtSecret: process.env["JWT_SECRET"]!,
  jwtExpiresIn: process.env["JWT_EXPIRES_IN"]
};
