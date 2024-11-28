import React from "react";
import { cn } from "../../utils/cn";
import { BeatLoader } from "react-spinners";
import { buttonVariants } from "./ui/button";

export default function SubmitButton({ value, formSubscribe: form }) {
  return (
    <form.Subscribe
      selector={(state) => [state.canSubmit, state.isSubmitting]}
      children={([canSubmit, isSubmitting]) => {
        return (
          <button
            className={cn(
              "p-4 w-full rounded-md font-medium text-sm",
              "bg-gray-900 hover:bg-gray-950 text-white",
              "focus:ring focus:ring-gray-600",
              "transition-all",
              buttonVariants({
                variant: "default",
              })
            )}
            type="submit"
            disabled={!canSubmit}
          >
            {isSubmitting ? <BeatLoader color="#ffffff" size="5px" /> : value}
          </button>
        );
      }}
    />
  );
}
