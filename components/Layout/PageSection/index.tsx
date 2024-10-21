import { HTMLAttributes } from 'react';
import classNames from '../../../utils/classnames';

type PageSectionProps = HTMLAttributes<HTMLElement>;

export default function PageSection({
  children,
  className,
  ...props
}: PageSectionProps) {
  return (
    <section
      className={classNames(
        'container py-2 py-lg-4 py-xl-5 mb-2 mb-md-3',
        className
      )}
      {...props}
    >
      {children}
    </section>
  );
}
