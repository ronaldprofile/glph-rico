import { InputHTMLAttributes } from "react";
import cx from "classnames";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {}

export function Input({ className, ...rest }: InputProps) {
  return (
    <input
      {...rest}
      className={cx(
        "h-10 px-2 rounded-md focus:outline-none border-2 border-transparent focus:border-purple-700 bg-custom-gray-primary transition-colors",
        className
      )}
    />
  );
}
