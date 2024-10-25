export const emailConfig = {
  mailTrap:{
    host: process.env["MAIL_TRAP_SMTP_HOST"]!,
    port: parseInt(process.env["MAIL_TRAP_SMTP_PORT"]!, 10),
    user: process.env["MAIL_TRAP_SMTP_USERNAME"]!,
    pass: process.env["MAIL_TRAP_SMTP_PASSWORD"]!,
    secure: false,
  },
  provider: process.env["EMAIL_PROVIDER"]!,
  sendgrid: {
    host: process.env["SEND_GRID_SMTP_HOST"]!,
    port: parseInt(process.env["SEND_GRID_SMTP_PORT"]!, 10),
    user: process.env["SEND_GRID_SMTP_USERNAME"]!,
    pass: process.env["SEND_GRID_SMTP_PASSWORD"]!,
    secure: false,
  },
  mailgun: {
    host: process.env["MAILGUN_SMTP_HOST"]!,
    port: parseInt(process.env["MAILGUN_SMTP_PORT"]!, 10),
    user: process.env["MAILGUN_SMTP_USERNAME"]!,
    pass: process.env["MAILGUN_SMTP_PASSWORD"]!,
    secure: false,
  },
  gmail:{
    service: process.env["GMAIL_SMTP_SERVICE"]!,
    user: process.env["GMAIL_SMTP_USER"]!,
    pass: process.env["GMAIL_SMTP_PASSWORD"]!,
  },
  emailFromEmail: process.env["EMAIL_FROM_EMAIL"]!,
  emailFromName: process.env["EMAIL_FROM_NAME"]!,
  emailSecure: false,
};
