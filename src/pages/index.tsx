import { Layout } from '@/components'
import { Card, CardHeader, Grid } from '@mui/material'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px )' }}>
            <CardHeader title="Pending" />

            {/* <NewEntry /> */}
            {/* <EntryList status='pending'/> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px )' }}>
            <CardHeader title="In progress" />
            {/* <EntryList status='in-progress' /> */}
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card sx={{ height: 'calc(100vh - 100px )' }}>
            <CardHeader title="Done" />
            {/* <EntryList status='finished' /> */}
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
