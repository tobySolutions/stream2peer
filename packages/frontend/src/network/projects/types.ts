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