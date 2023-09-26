import { Box } from '@mui/material'
import Head from 'next/head'
import { type FC, type ReactNode } from 'react'
import { NavBar, SideBar } from './'

interface Props {
  title?: string
  children: ReactNode
}

export const Layout: FC<Props> = ({ title = '', children }) => {
  const pageTitle = ['Next Open Jira', title].join(' | ')
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <NavBar />

      <SideBar />

      <Box sx={{ padding: '1rem' }}>{children}</Box>
    </Box>
  )
}
