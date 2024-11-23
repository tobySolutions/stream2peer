export enum NotificationStatus {
  READ = 'read',
  UNREAD = 'unread',
}

export type Notification = {
  identifier: string;
  text: string;
  status: NotificationStatus;
};
