import { UiContext } from '@/contexts/ui'
import { type Entry } from '@/interfaces/Entry'
import { getTimeDistance } from '@/utils/getTimeDistance'
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material'
import { useRouter } from 'next/router'
import { useContext, type DragEvent, type FC } from 'react'

interface Props {
  entry: Entry
}

export const EntryCard: FC<Props> = ({ entry }) => {
  const { startDragging, endDragging, setLoading, setIsAddingEntry } =
    useContext(UiContext)
  const router = useRouter()

  const onDragStart = (event: DragEvent): void => {
    event.dataTransfer.setData('id', entry._id)
    startDragging()
  }

  const onDragEnd = (): void => {
    endDragging()
  }

  const onClickCard = (): void => {
    setIsAddingEntry(false)
    setLoading(true)
    void router.push(`/${entry._id}`).finally(() => {
      setLoading(false)
    })
  }

  return (
    <Card
      sx={{ marginBottom: '1rem' }}
      draggable
      elevation={4}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onClickCard}
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
          <Typography variant="body2" color="gray">{`Created ${getTimeDistance(
            entry.createdAt,
          )} ago`}</Typography>
        </CardActions>
      </CardActionArea>
    </Card>
  )
}
