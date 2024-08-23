import type { NextApiRequest, NextApiResponse } from 'next'
import { frameworks } from '../../../api/src/data/frameworks'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(frameworks)
}
