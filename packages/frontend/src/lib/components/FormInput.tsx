import React from "react";
import FieldInfo from "./FieldInfo";
import { cn } from "../../utils/cn";

function FormInput({
  fieldInfo: { name, placeholder, isRequired = true },
  field,
}) {
  return (
    <>
      <div className="relative my-6">
        <input
          name={name}
          value={field.state.meta.value}
          onBlur={field.handleBlur}
          onChange={(e) => field.handleChange(e.target.value)}
          className="w-full border border-primary/60  p-4 rounded-md text-sm peer placeholder:text-transparent bg-transparent outline-none"
          placeholder={placeholder}
          required={isRequired}
        />
        <label
          className={cn(
            "text-sm",
            "absolute -top-5 left-0",
            "peer-placeholder-shown:text-gray-400 peer-placeholder-shown:top-4 peer-placeholder-shown:left-4 peer-focus:-top-6 peer-focus:left-0 peer-focus:text-muted-foreground peer-focus:after:text-red-500 peer-placeholder-shown:after:text-gray-400",
            "after:content-['*']  transition-all"
          )}
        >
          {placeholder}
        </label>
        <FieldInfo field={field} />
      </div>
    </>
  );
}

export default FormInput;
