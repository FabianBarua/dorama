export interface HotVideoListItem {
  bookId: string
  bookName: string
  introduction: string
  author: string
  cover: string
  inLibraryCount: number
  sort: number
  protagonist: string
  tagNames: string[]
  hotCode: string
  markNamesConnectKey: string
  inLibrary: boolean
}

export interface Data {
  searchPresetWords: string
  hotVideoList: HotVideoListItem[]
}

export interface BuscarInicioResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
