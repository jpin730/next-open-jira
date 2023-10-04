import mongoose, { ConnectionStates } from 'mongoose'

let dbState = ConnectionStates.disconnected

export const connect = async (): Promise<void> => {
  if (dbState !== ConnectionStates.disconnected) {
    // eslint-disable-next-line no-console
    console.log('Already connected to database.')
    return
  }

  const connection = mongoose.connections.at(0)
  if (connection !== undefined) {
    dbState = connection.readyState
    if (dbState === ConnectionStates.connected) {
      // eslint-disable-next-line no-console
      console.log('Using existing connection.')
      return
    }
    await mongoose.disconnect()
  }

  await mongoose.connect(process.env.DB_CNN ?? '')
  dbState = ConnectionStates.connected
  // eslint-disable-next-line no-console
  console.log('Database connected.')
}

export const disconnect = async (): Promise<void> => {
  if (process.env.NODE_ENV === 'development') return

  if (dbState === ConnectionStates.disconnected) return

  await mongoose.disconnect()
  // eslint-disable-next-line no-console
  console.log('Database disconnected.')
}
