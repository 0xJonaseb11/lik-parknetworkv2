'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { PropsWithChildren, useEffect } from 'react';
import classNames from '../../utils/classnames';
import { useSession } from 'next-auth/react';

import { signOut } from 'next-auth/react';

const menuItems = [
  {
    icon: <i className="bx bx-card fs-xl opacity-60 me-2"></i>,
    name: 'WePark Membership NFT',
    href: '/admin/we-park/nft/membership'
  },
  {
    icon: <i className="bx bx-network-chart fs-xl opacity-60 me-2"></i>,
    name: 'WePark Network NFT',
    href: '/admin/we-park/nft/network'
  },
  {
    icon: <i className="bx bx-space-bar fs-xl opacity-60 me-2"></i>,
    name: 'WePark Space NFT',
    href: '/admin/we-park/nft/space'
  },
];

export default function AdminLayout({ children }: PropsWithChildren) {
  const pathname = usePathname();

  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      router.push('/admin/auth/signin');
    }
  }, [session, router, pathname])

  return (
    <section className="container pt-5">
      <div className="row">
        <aside className="col-lg-3 col-md-4 border-end pb-5 mt-n5">
          <div className="position-sticky top-0">
            <div className="text-center pt-5">
              <div className="d-table position-relative mx-auto mt-2 mt-lg-4 pt-5 mb-3">
                <img
                  src="https://silicon.createx.studio/assets/img/avatar/18.jpg"
                  className="d-block rounded-circle"
                  width="120"
                  alt="John Doe"
                />
                <button
                  type="button"
                  className="btn btn-icon btn-light bg-white btn-sm border rounded-circle shadow-sm position-absolute bottom-0 end-0 mt-4"
                  data-bs-toggle="tooltip"
                  data-bs-placement="bottom"
                  title="Change picture"
                  aria-label="Change picture"
                >
                  <i className="bx bx-refresh"></i>
                </button>
              </div>
              <h2
                className="h5 mb-1"
              >
                Admin
              </h2>
              <p className="mb-3 pb-3">jonny@email.com</p>
              <button
                type="button"
                className="btn btn-secondary w-100 d-md-none mt-n2 mb-3"
                data-bs-toggle="collapse"
                data-bs-target="#account-menu"
              >
                <i className="bx bxs-user-detail fs-xl me-2"></i>
                Dashboard menu
                <i className="bx bx-chevron-down fs-lg ms-1"></i>
              </button>
              <div
                id="account-menu"
                className="list-group list-group-flush collapse d-md-block"
              >
                {menuItems.map(({ icon, name, href }) => (
                  <Link
                    key={href}
                    href={href}
                    className={classNames(
                      'list-group-item list-group-item-action d-flex align-items-center',
                      { active: pathname.includes(href) }
                    )}
                  >
                    {icon}
                    {name}
                  </Link>
                ))}
                <Link
                    href={'#'}
                    className={classNames(
                      'list-group-item list-group-item-action d-flex align-items-center',
                    )}
                    onClick={async e => {
                      e.preventDefault();
                      await signOut({callbackUrl: '/admin/auth/signin'});
                    }}
                  >
                    <i className="bx bx-log-out fs-xl opacity-60 me-2"></i>
                    Sign Out
                  </Link>
              </div>
            </div>
          </div>
        </aside>

        <div className="col-md-8 offset-lg-1 pb-5 mb-2 mb-lg-4 pt-md-5 mt-n3 mt-md-0">
          <div className="ps-md-3 ps-lg-0 mt-md-2 pt-md-4 pb-md-2">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
