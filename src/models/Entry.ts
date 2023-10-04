import { type Entry, EntryStatus } from '@/interfaces/Entry'
import mongoose, { type Model, Schema } from 'mongoose'

export interface IEntry extends Entry {}

const entrySchema = new Schema({
  description: { type: String, required: true },
  createdAt: { type: Number },
  status: {
    type: String,
    enum: {
      values: Object.values(EntryStatus),
      message: '{VALUE} is invalid',
    },
    default: EntryStatus.pending,
  },
})

export const EntryModel: Model<IEntry> =
  (mongoose.models.Entry as Model<IEntry> | undefined) ??
  (mongoose.model('Entry', entrySchema) as unknown as Model<IEntry>)
