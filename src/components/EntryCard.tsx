import { type Entry } from '@/interfaces/Entry'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { type FC } from 'react'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  //   const { startDragging, endDragging } = useContext(UiContext)

  //   const onDragStart = (event: DragEvent) => {
  //     event.dataTransfer.setData('text', entry._id)

  //     startDragging()
  //   }

  //   const onDragEnd = () => {
  //     endDragging()
  //   }

  return (
    <Card
      sx={{ marginBottom: '1rem' }}
      draggable
      elevation={4}
      //   onDragStart={onDragStart}
      //   onDragEnd={onDragEnd}
    >
      <CardActionArea>
        <CardContent>
          <Typography sx={{ whiteSpace: 'pre-line' }}>
            {entry.description}
          </Typography>
        </CardContent>

        <CardActions
          sx={{ display: 'flex', justifyContent: 'end', paddingRight: 2 }}
        >
          <Typography variant="body2">30 min ago</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
