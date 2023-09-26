import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import InboxIcon from '@mui/icons-material/Inbox'
import DraftsIcon from '@mui/icons-material/Drafts'
import { useContext, type FC } from 'react'
import { UiContext } from '@/contexts/ui'

const menuItems: string[] = ['Inbox', 'Starred', 'Send Email', 'Drafts']

export const SideBar: FC = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UiContext)

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box sx={{ width: 250 }}>
        <Box sx={{ padding: '1rem' }}>
          <Typography variant="h4">Menu</Typography>
        </Box>

        <List>
          {menuItems.map((text, index) => (
            <ListItem key={text}>
              <ListItemButton>
                <ListItemIcon>
                  {index % 2 !== 0 ? <InboxIcon /> : <DraftsIcon />}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
