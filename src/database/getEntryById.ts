import { EntryModel, type IEntry } from '@/models/Entry'
import { isValidObjectId } from 'mongoose'
import { db } from '.'

export const getEntryById = async (id: string): Promise<IEntry | null> => {
  if (!isValidObjectId(id)) return null

  try {
    await db.connect()
    const entry = await EntryModel.findById(id).lean()
    await db.disconnect()
    return JSON.parse(JSON.stringify(entry))
  } catch {
    return null
  }
}
