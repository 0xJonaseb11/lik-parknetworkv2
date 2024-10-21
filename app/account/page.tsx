'use client';

import useRedirect from "../../hooks/useRedirect";

export default function Page() {
  useRedirect('/account/details');
  return <></>;
}
