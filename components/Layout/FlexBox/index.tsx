import { HTMLAttributes } from 'react';
import classNames from '../../../utils/classnames';

type FlexBoxProps = HTMLAttributes<HTMLDivElement>;

export default function FlexBox({
  children,
  className,
  ...props
}: FlexBoxProps) {
  return (
    <div className={classNames('flex', className)} {...props}>
      {children}
    </div>
  );
}
