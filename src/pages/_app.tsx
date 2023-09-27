import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '@/themes'
import { UiProvider } from '@/contexts/ui'
import { EntriesProvider } from '@/contexts/entries'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <EntriesProvider>
      <UiProvider>
        <ThemeProvider theme={lightTheme ?? darkTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </UiProvider>
    </EntriesProvider>
  )
}
