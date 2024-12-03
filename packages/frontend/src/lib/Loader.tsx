export const Loader = ({ variant }: { variant: "small" | "large" }) => {
  return (
    <div
      className={`animate-spin rounded-full ${variant == "small" ? "h-6 w-6 border-t-2 border-b-2" : variant == "large" ? "h-24 w-24 border-t-4 border-b-4" : ""}   dark:border-[#FFFFFF] border-primary`}
    ></div>
  );
};
