import { LabelHTMLAttributes } from 'react';
import classNames from '../../../utils/classnames';

export type InputLabelProps = LabelHTMLAttributes<HTMLLabelElement>;

export default function InputLabel({
  children,
  className,
  ...props
}: InputLabelProps) {
  return (
    <label className={classNames('form-label fs-base', className)} {...props}>
      {children}
    </label>
  );
}
