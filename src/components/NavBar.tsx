import { AppBar, Button, IconButton, Toolbar, Typography } from '@mui/material'
import { useContext, type FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import LightModeIcon from '@mui/icons-material/LightMode'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import { UiContext } from '@/contexts/ui'
import { EntriesContext } from '@/contexts/entries'

export const NavBar: FC = () => {
  const { openSideMenu, isDarkTheme, toggleTheme } = useContext(UiContext)
  const { resetEntries } = useContext(EntriesContext)

  const onClickReset = (): void => {
    void resetEntries()
  }

  return (
    <AppBar position="sticky">
      <Toolbar sx={{ display: 'flex' }}>
        <IconButton
          color="inherit"
          edge="start"
          size="large"
          onClick={openSideMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">Next Open Jira</Typography>

        <span style={{ flexGrow: 1 }}></span>

        <IconButton
          color="inherit"
          sx={{ marginX: '1rem' }}
          onClick={toggleTheme}
        >
          {isDarkTheme ? <DarkModeIcon /> : <LightModeIcon />}
        </IconButton>

        <Button variant="outlined" color="inherit" onClick={onClickReset}>
          Reset Data
        </Button>
      </Toolbar>
    </AppBar>
  )
}
