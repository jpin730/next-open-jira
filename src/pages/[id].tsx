import { Layout } from '@/components'
import { EntriesContext } from '@/contexts/entries'
import { type Entry, EntryStatus } from '@/interfaces/Entry'
import SaveIcon from '@mui/icons-material/Save'
import DeleteIcon from '@mui/icons-material/Delete'
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  Radio,
  RadioGroup,
  TextField,
  capitalize,
} from '@mui/material'
import { type GetServerSideProps, type NextPage } from 'next'
import {
  type ChangeEvent,
  useContext,
  useMemo,
  useState,
  useCallback,
} from 'react'
import { getEntryById } from '@/database'
import { UiContext } from '@/contexts/ui'
import { useRouter } from 'next/router'
import { getTimeDistance } from '@/utils/getTimeDistance'

const validStatus = Object.values(EntryStatus)

interface Props {
  entry: Entry
}

export const EntryPage: NextPage<Props> = ({ entry }) => {
  const { updateEntry } = useContext(EntriesContext)
  const { setLoading } = useContext(UiContext)

  const router = useRouter()

  const [inputValue, setInputValue] = useState(entry.description)
  const [status, setStatus] = useState<EntryStatus>(entry.status)
  const [touched, setTouched] = useState(false)

  const isNotValid = useMemo(
    () => inputValue.trim().length <= 0 && touched,
    [inputValue, touched],
  )

  const onInputValueChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const onStatusChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setStatus(event.target.value as EntryStatus)
  }

  const returnToHome = useCallback((): void => {
    setLoading(true)
    void router.push('/').finally(() => {
      setLoading(false)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const onSave = async (): Promise<void> => {
    setTouched(true)
    if (inputValue.trim().length === 0) return

    const updatedEntry: Entry = {
      ...entry,
      status,
      description: inputValue.trim(),
    }

    await updateEntry(updatedEntry)

    returnToHome()
  }

  const onCancel = (): void => {
    returnToHome()
  }

  return (
    <Layout
      title={
        inputValue.length > 10 || inputValue.length === 0
          ? inputValue.substring(0, 10) + '...'
          : inputValue
      }
    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="calc(100vh - 180px)"
      >
        <Card sx={{ maxWidth: '100rem', padding: '1rem' }} variant="outlined">
          <CardHeader
            title={`Entry`}
            subheader={`Created ${getTimeDistance(entry.createdAt)} ago`}
            action={
              <IconButton color="error">
                <DeleteIcon />
              </IconButton>
            }
          />

          <CardContent>
            <TextField
              fullWidth
              autoFocus
              multiline
              label="New entry"
              value={inputValue}
              onBlur={() => {
                setTouched(true)
              }}
              onChange={onInputValueChanged}
              helperText={isNotValid && 'Field is required.'}
              error={isNotValid}
            />

            <FormControl>
              <FormLabel>Status:</FormLabel>
              <RadioGroup row value={status} onChange={onStatusChanged}>
                {validStatus.map((option) => (
                  <FormControlLabel
                    key={option}
                    value={option}
                    control={<Radio />}
                    label={capitalize(option)}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </CardContent>

          <CardActions sx={{ display: 'flex', justifyContent: 'end' }}>
            <Button onClick={onCancel}>Cancel</Button>

            <Button
              startIcon={<SaveIcon />}
              variant="contained"
              onClick={() => {
                void onSave()
              }}
            >
              Save
            </Button>
          </CardActions>
        </Card>
      </Box>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { id } = params as { id: string }

  const entry = await getEntryById(id)

  if (entry === null) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  return {
    props: {
      entry,
    },
  }
}

export default EntryPage
