import { IconHome2, IconScale } from '@tabler/icons-react'

import { routes } from '@redwoodjs/router'

export const navItems = [
  {
    name: 'Home',
    route: '/',
    icon: <IconHome2 size="1rem" stroke={1.5} />,
  },
  {
    name: 'Calculator',
    route: '/calculator',
    icon: <IconScale size="1rem" stroke={1.5} />,
  },
  // {
  //   name: 'Statistics',
  //   // route: routes.statistics(),
  //   comingSoon: true,
  // },
]

export default navItems
