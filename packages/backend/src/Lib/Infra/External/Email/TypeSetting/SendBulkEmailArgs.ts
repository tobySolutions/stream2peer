export interface SendBulkEmailArgs {
  to: string;
  subject: string;
  body: string;
  templateId?: string;
}
