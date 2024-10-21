import { HTMLAttributes } from 'react';

export default function StripedTable({
  children,
  ...props
}: HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="table-responsive">
      <table className="table table-striped" {...props}>
        {children}
      </table>
    </div>
  );
}
