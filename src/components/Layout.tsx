import { Box } from '@mui/material';
import Head from 'next/head';
import { FC, ReactNode } from 'react';
import { NavBar } from './NavBar';

interface Props {
  title?: string;
  children: ReactNode;
}

export const Layout: FC<Props> = ({ title = '', children }) => {
  const pageTitle = ['Next Open Jira', title].join(' | ');
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <NavBar />

      <Box sx={{ padding: '1rem' }}>{children}</Box>
    </Box>
  );
};
