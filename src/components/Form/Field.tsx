import { HTMLAttributes } from "react";

interface FieldProps extends HTMLAttributes<HTMLDivElement> {}

export function Field({ children, ...rest }: FieldProps) {
  return (
    <div {...rest} className="flex flex-col gap-2">
      {children}
    </div>
  );
}
