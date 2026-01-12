export interface RecommendList {
  current: number
  size: number
  total: number
  records: unknown[]
  pages: number
}

export interface TagV3sItem {
  tagId: number
  tagName: string
  tagEnName: string
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

export interface RecordsItem {
  bookId: string
  bookName: string
  coverWap: string
  chapterCount: number
  introduction: string
  tags: string[]
  tagV3s: TagV3sItem[]
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

export interface NewTheaterList {
  current: number
  size: number
  total: number
  records: RecordsItem[]
  pages: number
}

export interface ChannelBuilder {
  feedFrom: string
  columnId: string
  columnName: string
  moduleID: string
  moduleName: string
}

export interface Data {
  bannerList: unknown[]
  watchHistory: unknown[]
  columnVoList: unknown[]
  recommendList: RecommendList
  newTheaterList: NewTheaterList
  channelBuilder: ChannelBuilder
  cornerSwitch: boolean
  reserveChannelFlag: boolean
  isAlgorithmBanner: number
}

export interface NewSectionResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
