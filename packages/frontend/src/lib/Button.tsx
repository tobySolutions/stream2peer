import clsx from "clsx";

type ButtonProps = {
  isDisabled?: boolean;
  className?: string;
};

function Button({ isDisabled, className }: ButtonProps) {
  return (
    <button
      type="submit"
      disabled={isDisabled}
      className={clsx(
        "rounded-[8px] bg-yellow-dark-4 py-[1rem] text-center  text-yellow-dark-11 shadow-md transition duration-100 ease-in-out hover:bg-yellow-dark-5 ",
        {
          "cursor-not-allowed opacity-60": isDisabled,
        },
        className
      )}
    >
      Submit
    </button>
  );
}

export default Button;
