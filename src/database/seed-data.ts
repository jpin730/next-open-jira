import { type Entry, EntryStatus } from '@/interfaces/Entry'

interface SeedData {
  entries: SeedEntry[]
}

type SeedEntry = Omit<Entry, '_id'>

export const seedData: SeedData = {
  entries: [
    {
      description:
        'Pending: Proident dolor duis elit sunt qui dolor laborum veniam ea laboris qui consequat.',
      status: EntryStatus.pending,
      createdAt: Date.now(),
    },
    {
      description:
        'In-progress: Veniam in cupidatat adipisicing Lorem sunt est est ex cillum laboris fugiat officia fugiat.',
      status: EntryStatus.inProgress,
      createdAt: Date.now() - 1000000,
    },
    {
      description:
        'Done: Commodo veniam aliqua tempor officia officia non laborum.',
      status: EntryStatus.done,
      createdAt: Date.now() - 100000,
    },
  ],
}
