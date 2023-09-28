import { EntryList, Layout } from '@/components'
import { EntryStatus } from '@/interfaces/Entry'
import { Card, CardHeader, Grid } from '@mui/material'
import { type NextPage } from 'next'

const HomePage: NextPage = () => {
  return (
    <Layout title="Home">
      <Grid container spacing={2}>
        <Grid item xs={12} sm={4}>
          <Card elevation={0}>
            <CardHeader title="Pending" />

            <EntryList status={EntryStatus.pending} />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={0}>
            <CardHeader title="In progress" />
            <EntryList status={EntryStatus.inProgress} />
          </Card>
        </Grid>

        <Grid item xs={12} sm={4}>
          <Card elevation={0}>
            <CardHeader title="Done" />
            <EntryList status={EntryStatus.done} />
          </Card>
        </Grid>
      </Grid>
    </Layout>
  )
}

export default HomePage
