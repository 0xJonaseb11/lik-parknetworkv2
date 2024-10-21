import { HTMLAttributes } from 'react';
import classNames from '../../../utils/classnames';

type ColProps = HTMLAttributes<HTMLDivElement>;

export default function Col({ children, className, ...props }: ColProps) {
  return (  
    <div className={classNames('col', className)} {...props}>
      {children}
    </div>
  );
}
