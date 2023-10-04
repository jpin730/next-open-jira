import { db } from '@/database'
import { EntryModel, type IEntry } from '@/models/Entry'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | { entries: IEntry[] }

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> | void {
  switch (req.method) {
    case 'GET':
      return getEntries(res)

    case 'POST':
      return postEntry(req, res)

    default:
      res.status(400).json({ message: 'Endpoint does not exist.' })
  }
}

const getEntries = async (res: NextApiResponse<Data>): Promise<void> => {
  await db.connect()
  try {
    const entries = await EntryModel.find().sort({ createdAt: 'ascending' })
    res.status(200).json({ entries })
  } catch {
    res.status(500).json({ message: 'Something went wrong.' })
  }
  await db.disconnect()
}

const postEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  const { description = '' } = req.body

  const newEntry = new EntryModel({
    description,
    createdAt: Date.now(),
  })

  await db.connect()
  try {
    await newEntry.save()
    res.status(201).json({ message: 'Entry created' })
  } catch {
    res.status(500).json({ message: 'Something went wrong.' })
  }

  await db.disconnect()
}
