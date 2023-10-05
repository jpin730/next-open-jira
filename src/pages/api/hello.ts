import type { NextApiRequest, NextApiResponse } from 'next'

interface Data {
  message: string
  method?: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
): void {
  res.status(200).json({ message: 'Hello world!', method: req.method })
}
