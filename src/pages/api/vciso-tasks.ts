import type { NextApiRequest, NextApiResponse } from 'next'
import { vcisoTasks } from '../../../api/src/data/vcisoTasks'

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.status(200).json(vcisoTasks)
}
