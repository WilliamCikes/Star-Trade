// Import styles of packages that you've installed.
// All packages except `@mantine/hooks` require styles imports
import '@mantine/core/styles.css'
import './index.css'

import React, { ReactNode } from 'react'

import {
  ColorSchemeScript,
  MantineProvider,
  createTheme,
  MantineColorsTuple,
} from '@mantine/core'
import { Provider as JotaiProvider } from 'jotai'

import { FatalErrorBoundary, RedwoodProvider } from '@redwoodjs/web'
import { RedwoodApolloProvider } from '@redwoodjs/web/apollo'

import FatalErrorPage from 'src/pages/FatalErrorPage'
import Routes from 'src/Routes'

interface AppProps {
  children: ReactNode
}

const myColor: MantineColorsTuple = [
  '#f3edff',
  '#e0d7fa',
  '#beabf0',
  '#9a7ce6',
  '#7c56de',
  '#683dd9',
  '#5f2fd8',
  '#4f23c0',
  '#451eac',
  '#3a1899',
]

const theme = createTheme({
  colors: {
    myColor,
  },
})

const App: React.FC<AppProps> = () => (
  <FatalErrorBoundary page={FatalErrorPage}>
    <RedwoodProvider titleTemplate="%PageTitle | %AppTitle">
      <JotaiProvider>
        <ColorSchemeScript />
        <MantineProvider defaultColorScheme="dark" theme={theme}>
          <RedwoodApolloProvider>
            <Routes />
          </RedwoodApolloProvider>
        </MantineProvider>
      </JotaiProvider>
    </RedwoodProvider>
  </FatalErrorBoundary>
)

export default App
