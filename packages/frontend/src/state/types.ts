export type ProjectDetails = {
  identifier: string;
  id: number;
  title: string;
  description: string;
  image_url: string;
};

export type Theme = "dark" | "light" | "system";

export const storageKey = "vite-ui-theme";
export const defaultTheme: Theme = "dark";
