import { NextApiRequest, NextApiResponse } from 'next'
import mockData from './results.json'

/**
 * Data interfaces
 */
export interface IItemPicture {
  id: number
  path: string
}

export interface IItem {
  id: number
  source: string
  description: string
  added: string
  duration: string
  picture: IItemPicture[]
  tag: string[]
  pornstar: string[]
  webcam: string[]
}

export interface ISearchData {
  info: {
    total: number
    search_term: string
  }
  item: IItem[]
}

/**
 * Fake mock API
 */
export default function(
  req: NextApiRequest,
  res: NextApiResponse<ISearchData>
) {
  // const { start, end } = req.query

  // Set http headers
  res.statusCode = 200
  res.setHeader('Content-Type', 'application/json')

  // Send response
  res.end(JSON.stringify(mockData))
}
