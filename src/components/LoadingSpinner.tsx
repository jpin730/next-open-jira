import { UiContext } from '@/contexts/ui'
import { Backdrop, CircularProgress } from '@mui/material'
import { useContext, type FC } from 'react'

export const LoadingSpinner: FC = () => {
  const { isLoading } = useContext(UiContext)

  return (
    <>
      {isLoading && (
        <Backdrop
          open
          invisible
          sx={{
            zIndex: (theme) => theme.zIndex.drawer + 1,
            cursor: 'progress',
          }}
        >
          <CircularProgress />
        </Backdrop>
      )}
    </>
  )
}
