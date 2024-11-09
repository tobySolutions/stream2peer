export enum ProjectRole {
  HOST = 'Host',
  CO_HOST = 'co-Host',
  SUBSCRIBER = 'Subscriber',
}

export type ProjectPeer = {
  userId: string;
  role: ProjectRole;
};
