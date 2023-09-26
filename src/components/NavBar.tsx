import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { useContext, type FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'
import { UiContext } from '@/contexts/ui'

export const NavBar: FC = () => {
  const { openSideMenu } = useContext(UiContext)

  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          size="large"
          onClick={openSideMenu}
        >
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">Next Open Jira</Typography>
      </Toolbar>
    </AppBar>
  )
}
