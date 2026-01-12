export interface TagV3sItem {
  tagId: number
  tagName: string
  tagEnName: string
}

export interface BookSource {
  sceneId: string
  expId: string
  strategyId: string
  strategyName: string
  log_id: string
}

export interface Corner {
  cornerType: number
  name: string
  color: string
}

export interface RankVo {
  rankType: number
  hotCode: string
  recCopy: string
  sort: number
}

export interface BookListItem {
  bookId: string
  bookName: string
  coverWap: string
  chapterCount: number
  introduction: string
  tags: string[]
  tagV3s: TagV3sItem[]
  bookSource: BookSource
  isEntry: number
  index: number
  corner: Corner
  dataFrom: string
  cardType: number
  rankVo: RankVo
  markNamesConnectKey: string
  algorithmRecomDot: string
  playCount: string
  bookShelfTime: number
  shelfTime: string
  inLibrary: boolean
}

export interface ColumnVoListItem {
  columnId: number
  title: string
  subTitle: string
  style: string
  bookList: BookListItem[]
  type: number
}

export interface BookSource1 {
  sceneId: string
  expId: string
  strategyId: string
  strategyName: string
  log_id: string
}

export interface TagBooksItem {
  bookId: string
  bookName: string
  coverWap: string
  bookSource: BookSource1
  algorithmRecomDot: string
}

export interface TagCardVo {
  tagId: number
  tagName: string
  tagEnName: string
  tagBooks: TagBooksItem[]
}

export interface RecordsItem {
  isEntry: number
  index: number
  dataFrom: string
  cardType: number
  tagCardVo: TagCardVo
  markNamesConnectKey: string
  playCount: string
  inLibrary: boolean
}

export interface RecommendList {
  current: number
  size: number
  total: number
  records: RecordsItem[]
  pages: number
}

export interface NewTheaterList {
  current: number
  size: number
  total: number
  records: unknown[]
  pages: number
}

export interface Data {
  bannerList: unknown[]
  watchHistory: unknown[]
  columnVoList: ColumnVoListItem[]
  recommendList: RecommendList
  recommendListTitle: string
  newTheaterList: NewTheaterList
  cornerSwitch: boolean
  reserveChannelFlag: boolean
  isAlgorithmBanner: number
}

export interface HomeResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
