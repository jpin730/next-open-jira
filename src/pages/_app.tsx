import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { CssBaseline, ThemeProvider } from '@mui/material'
import { darkTheme, lightTheme } from '@/themes'
import { UiProvider } from '@/contexts/ui'
import { EntriesProvider } from '@/contexts/entries'
import { LoadingSpinner } from '@/components/LoadingSpinner'
import { SnackbarProvider } from 'notistack'

export default function App({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <SnackbarProvider
      variant="info"
      anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
    >
      <UiProvider>
        <EntriesProvider>
          <ThemeProvider theme={lightTheme ?? darkTheme}>
            <CssBaseline />
            <Component {...pageProps} />
            <LoadingSpinner />
          </ThemeProvider>
        </EntriesProvider>
      </UiProvider>
    </SnackbarProvider>
  )
}
