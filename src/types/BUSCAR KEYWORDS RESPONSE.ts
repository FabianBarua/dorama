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

export interface RecommendList {
  current: number
  size: number
  total: number
  records: HotVideoListItem[]
  pages: number
}

export interface Data {
  keyword: string
  suggestList: HotVideoListItem[]
  cornerSwitch: boolean
  searchPresetWords?: string
  hotVideoList?: HotVideoListItem[]
  bannerList?: any[]
  watchHistory?: any[]
  columnVoList?: any[]
  recommendList?: RecommendList
  recommendListTitle?: string
  newTheaterList?: any
  reserveChannelFlag?: boolean
  isAlgorithmBanner?: number
}

export interface BuscarKeywordsResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
