import { EntriesContext } from '@/contexts/entries'
import { EntryStatus } from '@/interfaces/Entry'
import { List, Paper } from '@mui/material'
import { useContext, type FC, useMemo } from 'react'
import { EntryCard, NewEntry } from '.'

interface Props {
  status: EntryStatus
}

export const EntryList: FC<Props> = ({ status }) => {
  const { entries /* updateEntry */ } = useContext(EntriesContext)
  // const { isDragging, endDragging } = useContext( UiContext );

  const entriesByStatus = useMemo(
    () => entries.filter((entry) => entry.status === status),
    [entries, status],
  )

  // const allowDrop = ( event: DragEvent<HTMLDivElement> ) => {
  //     event.preventDefault();
  // }

  // const onDropEntry = ( event: DragEvent<HTMLDivElement> ) => {
  //     const id = event.dataTransfer.getData('text');

  //     const entry = entries.find( e => e._id === id )!;
  //     entry.status = status;
  //     updateEntry( entry );
  //     endDragging();
  // }

  return (
    <div
    // onDrop={ onDropEntry }
    // onDragOver={ allowDrop }
    // className={ isDragging ? styles.dragging : '' }
    >
      <Paper
        variant="outlined"
        sx={{
          height: 'calc(100vh - 180px)',
          overflowY: 'auto',
          padding: '1rem 1rem',
        }}
      >
        <List
          sx={{ /*  opacity: isDragging ? 0.2 : 1, */ transition: 'all .3s' }}
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
