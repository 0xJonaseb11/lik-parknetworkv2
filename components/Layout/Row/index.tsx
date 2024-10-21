import { HTMLAttributes } from 'react';
import classNames from '../../../utils/classnames';

type RowProps = HTMLAttributes<HTMLDivElement>;

export default function Row({ children, className, ...props }: RowProps) {
  return (
    <div className={classNames('row', className)} {...props}>
      {children}
    </div>
  );
}
