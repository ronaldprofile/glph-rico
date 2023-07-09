import { LabelHTMLAttributes } from "react";

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {}

export function Label({ children, ...rest }: LabelProps) {
  return (
    <label {...rest} className="text-sm">
      {children}
    </label>
  );
}
