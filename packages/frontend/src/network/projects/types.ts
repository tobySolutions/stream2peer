export type AddProjectProps = {
  title: string;
  description: string;
  imageUrl?: string;
  inviteeId?: string;
};

export type UpdateProjectProps = {
  title: string;
  description: string;
};

export type InvitePeerProps = {
  users: { role: "co-Host" | "Subscriber"; userId: string }[];
};