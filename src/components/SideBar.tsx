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

import { useContext, type FC, useEffect } from 'react'
import { UiContext } from '@/contexts/ui'
import { EntriesContext } from '@/contexts/entries'
import { truncateText } from '@/utils/truncateText'

export const SideBar: FC = () => {
  const { sideMenuOpen, closeSideMenu } = useContext(UiContext)
  const { entries, fetchEntries } = useContext(EntriesContext)

  useEffect(() => {
    void fetchEntries()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Drawer anchor="left" open={sideMenuOpen} onClose={closeSideMenu}>
      <Box>
        <Box sx={{ padding: '1rem' }}>
          <Typography variant="h4">Entries</Typography>
        </Box>

        <List>
          {entries.map(({ _id, description }) => (
            <ListItem key={_id}>
              <ListItemButton href={`/${_id}`}>
                <ListItemIcon>
                  <InboxIcon />
                </ListItemIcon>
                <ListItemText primary={truncateText(description, 30)} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  )
}
