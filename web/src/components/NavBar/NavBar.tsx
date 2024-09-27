import React from 'react'

import { Badge, NavLink } from '@mantine/core'

import navItems from 'src/components/NavBar/NavItems'

const NavBar = () => {
  return (
    <>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          href={item.route as unknown as string}
          label={item.name}
          leftSection={item.icon}
        />
      ))}
    </>
  )
}

export default NavBar
