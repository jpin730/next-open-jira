import { db } from '@/database'
import { seedData } from '@/database/seed-data'
import { EntryModel } from '@/models/Entry'
import { type NextApiRequest, type NextApiResponse } from 'next'

interface Data {
  message: string
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> {
  await db.connect()
  await EntryModel.deleteMany()
  await EntryModel.insertMany(seedData.entries)
  await db.disconnect()

  res.status(200).json({ message: 'Seed completed.' })
}
