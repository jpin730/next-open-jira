import mongoose, { ConnectionStates } from 'mongoose'

export const connect = async (): Promise<void> => {
  const connection = mongoose.connections.at(0)
  if (
    connection !== undefined &&
    connection.readyState === ConnectionStates.connected
  ) {
    // eslint-disable-next-line no-console
    console.log('Already connected.')
    return
  }

  await mongoose.connect(process.env.DB_CNN ?? '')
  // eslint-disable-next-line no-console
  console.log(`Database connected. (${mongoose.connections.length})`)
}

export const disconnect = async (): Promise<void> => {
  const connection = mongoose.connections.at(0)
  if (
    connection !== undefined &&
    connection.readyState === ConnectionStates.disconnected
  ) {
    // eslint-disable-next-line no-console
    console.log('Already disconnected.')
    return
  }

  await mongoose.disconnect()
  // eslint-disable-next-line no-console
  console.log(`Database disconnected. (${mongoose.connections.length})`)
}
