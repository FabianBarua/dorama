export interface GetChaptersRequest {
  boundaryIndex: number
  comingPlaySectionId: number
  index: number
  currencyPlaySource: string
  needEndRecommend: number
  currencyPlaySourceName: string
  preLoad: boolean
  rid: string
  pullCid: string
  loadDirection: number
  startUpKey: string
  bookId: string
  enterReaderChapterIndex?: number
}

export interface SearchRequest {
  keyword: string
}

export interface HomeRequest {
  homePageStyle: number
  isNeedRank: number
  index: number
  type: number
  channelId: number
}
