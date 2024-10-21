import { AnchorHTMLAttributes, PropsWithChildren } from 'react';
import classNames from '../../../utils/classnames';

type PrimaryButtonProps = AnchorHTMLAttributes<HTMLAnchorElement>;

function PrimaryButton({ children, className, ...props }: PrimaryButtonProps) {
  return (
    <a
      className={classNames('btn btn-outline-primary btn-lg', className)}
      {...props}
    >
      <i className="bx bx-images fs-4 lh-1 me-2"></i>
      {children}
    </a>
  );
};

export {
    PrimaryButton
}
