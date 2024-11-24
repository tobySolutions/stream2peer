

export type ICreateStream = {
  title: string;
  description: string;
  platforms?: ("Twitch" | "Youtube")[];
  scheduleData?: Date | null;
}; 