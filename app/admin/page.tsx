'use client';

import useRedirect from '../../hooks/useRedirect';

export default function Page() {
  useRedirect('/admin/account/details');

  return <></>;
}
