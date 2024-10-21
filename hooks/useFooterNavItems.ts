export type NavItem = {
  title: string;
  href: string;
};

export default function useFooterNavItems() {
  const pageNavItems: NavItem[] = [
    {
      title: 'Home',
      href: '#'
    },
    {
      title: 'About',
      href: '#'
    },
    {
      title: 'Services',
      href: '#'
    },
    {
      title: 'Prices',
      href: '#'
    },
    {
      title: 'News',
      href: '#'
    }
  ];

  const legalNavItems: NavItem[] = [
    {
      title: 'Terms & Conditions',
      href: '#'
    },
    {
      title: 'Privacy Policy',
      href: '#'
    }
  ];

  const socialNavItems: NavItem[] = [
    {
      title: 'Facebook',
      href: '#'
    },
    {
      title: 'LinkedIn',
      href: '#'
    },
    {
      title: 'Twitter',
      href: '#'
    },
    {
      title: 'Instagram',
      href: '#'
    }
  ];

  return {
    pageNavItems,
    legalNavItems,
    socialNavItems
  };
}
