import { db } from '@/database'
import { EntryModel, type IEntry } from '@/models/Entry'
import mongoose from 'mongoose'
import { type NextApiRequest, type NextApiResponse } from 'next'

type Data = { message: string } | IEntry

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> | void {
  const { id } = req.query

  if (!mongoose.isValidObjectId(id)) {
    res.status(400).json({ message: 'Id is invalid.' })
    return
  }

  switch (req.method) {
    case 'PUT':
      return updateEntry(req, res)

    case 'GET':
      return getEntry(req, res)

    case 'DELETE':
      return deleteEntry(req, res)

    default:
      res.status(400).json({ message: 'Endpoint does not exist.' })
  }
}

const getEntry = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { id } = req.query

  await db.connect()
  try {
    const entryExist = await EntryModel.findById(id)
    await db.disconnect()

    if (entryExist === null) {
      res.status(400).json({ message: 'Entry does not exist.' })
      return
    }

    res.status(200).json(entryExist)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    await db.disconnect()
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const updateEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  const { id } = req.query

  await db.connect()
  try {
    const entryToUpdate = await EntryModel.findById(id)

    if (entryToUpdate === null) {
      await db.disconnect()
      res.status(400).json({ message: 'Entry does not exist.' })
      return
    }

    const {
      description = entryToUpdate.description,
      status = entryToUpdate.status,
    } = req.body

    const updatedEntry = await EntryModel.findByIdAndUpdate(
      id,
      { description, status },
      { runValidators: true, new: true },
    )
    await db.disconnect()
    res.status(200).json(updatedEntry as IEntry)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    await db.disconnect()
    res.status(500).json({ message: 'Something went wrong.' })
  }
}

const deleteEntry = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): Promise<void> => {
  const { id } = req.query

  await db.connect()
  try {
    const entryToDelete = await EntryModel.findById(id)

    if (entryToDelete === null) {
      await db.disconnect()
      res.status(400).json({ message: 'Entry does not exist.' })
      return
    }

    const updatedEntry = await EntryModel.findByIdAndRemove(id)
    await db.disconnect()
    res.status(200).json(updatedEntry as IEntry)
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error)
    await db.disconnect()
    res.status(500).json({ message: 'Something went wrong.' })
  }
}
