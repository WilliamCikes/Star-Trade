import React from 'react'

import {
  ActionIcon,
  AppShell,
  Badge,
  Burger,
  Container,
  Flex,
  Group,
  Title,
} from '@mantine/core'
import { Image } from '@mantine/core'
import { useDisclosure } from '@mantine/hooks'

import NavBar from 'src/components/NavBar/NavBar'
import { ShootingStars } from 'src/components/ui/shootingStars'
import { StarsBackground } from 'src/components/ui/starsBackground'

type BaseLayoutProps = {
  children?: React.ReactNode
}

const BaseLayout = ({ children }: BaseLayoutProps) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure()
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />
          <div
            className={'my-2 flex flex-row items-center justify-center gap-0.5'}
          >
            <Title order={3}></Title>
            <Image
              h={40}
              w={40}
              src={'logo.png'}
              fallbackSrc="https://placehold.co/600x400?text=Placeholder"
            />
            <Title order={3}>StarFee</Title>
            <Badge color="blue" className={'ml-2'}>
              Early Access
            </Badge>
          </div>
        </Group>
        <Group h="100%" px="md"></Group>
      </AppShell.Header>

      <AppShell.Navbar w={'10rem'}>
        <NavBar />
      </AppShell.Navbar>

      <AppShell.Main>
        <div className="absolute inset-0 z-0">
          <ShootingStars />
          <ShootingStars />
          <StarsBackground />
        </div>
        <Flex
          gap="md"
          justify="space-around"
          align="center"
          direction="column"
          wrap="wrap"
        >
          {children}
        </Flex>
      </AppShell.Main>
    </AppShell>
  )
}

export default BaseLayout
