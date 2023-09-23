import { Layout } from '@/components';
import { Typography } from '@mui/material';
import { NextPage } from 'next';

const HomePage: NextPage = () => {
  return (
    <Layout>
      <Typography variant="h1">Next Open Jira</Typography>
    </Layout>
  );
};

export default HomePage;
