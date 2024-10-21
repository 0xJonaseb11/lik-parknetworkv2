import { HTMLAttributes } from 'react';

type FormControlProps = HTMLAttributes<HTMLDivElement>;

export default function FormControl({ children, ...props }: FormControlProps) {
  return <div {...props}>{children}</div>;
}
