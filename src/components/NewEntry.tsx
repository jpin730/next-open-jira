import { EntriesContext } from '@/contexts/entries'
import { Box, Button, TextField } from '@mui/material'
import SaveIcon from '@mui/icons-material/Save'
import AddIcon from '@mui/icons-material/Add'
import { useContext, type FC, useState, type ChangeEvent } from 'react'
import { UiContext } from '@/contexts/ui'

export const NewEntry: FC = () => {
  const { addNewEntry } = useContext(EntriesContext)
  const { isAddingEntry, setIsAddingEntry } = useContext(UiContext)

  const [inputValue, setInputValue] = useState('')
  const [touched, setTouched] = useState(false)

  const onTextFieldChanged = (event: ChangeEvent<HTMLInputElement>): void => {
    setInputValue(event.target.value)
  }

  const onCancel = (): void => {
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  const onSave = (): void => {
    if (inputValue.length === 0) return

    void addNewEntry(inputValue)
    setIsAddingEntry(false)
    setTouched(false)
    setInputValue('')
  }

  return (
    <Box>
      {isAddingEntry ? (
        <>
          <TextField
            fullWidth
            sx={{ marginBottom: 1 }}
            autoFocus
            multiline
            label="New task"
            helperText={
              inputValue.length <= 0 && touched && 'Field is required'
            }
            error={inputValue.length <= 0 && touched}
            value={inputValue}
            onChange={onTextFieldChanged}
            onBlur={() => {
              setTouched(true)
            }}
          />

          <Box display="flex" justifyContent="end" gap={2}>
            <Button variant="text" onClick={onCancel}>
              Cancelar
            </Button>

            <Button
              variant="contained"
              startIcon={<SaveIcon />}
              onClick={onSave}
            >
              Save
            </Button>
          </Box>
        </>
      ) : (
        <Button
          startIcon={<AddIcon />}
          fullWidth
          variant="text"
          onClick={() => {
            setIsAddingEntry(true)
          }}
        >
          Add entry
        </Button>
      )}
    </Box>
  )
}
