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
