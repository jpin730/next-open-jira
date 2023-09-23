import { AppBar, IconButton, Toolbar, Typography } from '@mui/material'
import { type FC } from 'react'
import MenuIcon from '@mui/icons-material/Menu'

export const NavBar: FC = () => {
  return (
    <AppBar position="sticky">
      <Toolbar>
        <IconButton color="inherit" edge="start" size="large">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">Next Open Jira</Typography>
      </Toolbar>
    </AppBar>
  )
}
