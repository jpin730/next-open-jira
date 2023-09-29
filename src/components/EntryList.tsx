import { EntriesContext } from '@/contexts/entries'
import { type Entry, EntryStatus } from '@/interfaces/Entry'
import { List, Paper } from '@mui/material'
import { type DragEvent, useContext, type FC, useMemo } from 'react'
import { EntryCard, NewEntry } from '.'
import { UiContext } from '@/contexts/ui'
import styles from './EntryList.module.css'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries, updateEntry } = useContext(EntriesContext)
  const { isDragging, endDragging } = useContext(UiContext)

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status],
  )

  const allowDrop = (event: DragEvent<HTMLDivElement>): void => {
    event.preventDefault()
  }

  const onDropEntry = (event: DragEvent<HTMLDivElement>): void => {
    const id = event.dataTransfer.getData('id')
    const entry = entries.find((e) => e._id === id) as Entry
    updateEntry({ ...entry, status })
    endDragging()
  }

  return (
    <div onDrop={onDropEntry} onDragOver={allowDrop}>
      <Paper
        variant="outlined"
        className={isDragging ? styles.dragging : ''}
        sx={{
          height: 'calc(100vh - 180px)',
          overflowY: 'auto',
          padding: '1rem 1rem',
        }}
      >
        <List
          sx={{ opacity: isDragging ? 0.5 : 1, transition: 'opacity 300ms' }}
        >
          {entriesByStatus.map((entry) => (
            <EntryCard key={entry._id} entry={entry} />
          ))}
        </List>

        {status === EntryStatus.pending && <NewEntry />}
      </Paper>
    </div>
  )
}
