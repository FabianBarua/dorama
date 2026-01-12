export interface VideoPathListItem {
  quality: number
  videoPath: string
  isDefault: number
  isEntry: number
  isVipEquity: number
}

export interface CdnListItem {
  cdnDomain: string
  isDefault: number
  videoPathList: VideoPathListItem[]
}

export interface SenseRightsLoadInfo {
  desc: string
}

export interface ChapterListItem {
  chapterId: string
  chapterIndex: number
  isCharge: number
  chapterName: string
  cdnList: CdnListItem[]
  chapterImg: string
  chapterType: number
  needInterstitialAd: number
  senseRightsLoadInfo: SenseRightsLoadInfo
  viewingDuration: number
  spriteSnapshotUrl: string
  chargeChapter: boolean
}

export interface TagV3sItem {
  tagId: number
  tagName: string
  tagEnName: string
}

export interface FirstPlaySourceVo {
  firstPlaySource: string
  firstPlaySourceName: string
}

export interface Corner {
  cornerType: number
  name: string
  color: string
}

export interface ShareVo {
  description: string
  link: string
  shareId: string
  dramaShareLink: string
  shareDescription: string
  shareApps: string[]
}

export interface OfflineDownloadInfo {
  downloadSwitch: number
  downloadLimitNum: number
  downloadType: number
}

export interface RatingPopup {
  popupChapterIndex: number
  existenceTime: number
  popupTitle: string
  placeholder: string
}

export interface PerformersItem {
  performerId: string
  performerName: string
  performerAvatar: string
  videoCount: number
}

export interface Data {
  chapterList: ChapterListItem[]
  bookId: string
  bookName: string
  bookCover: string
  introduction: string
  playCount: string
  tags: string[]
  tagV3s: TagV3sItem[]
  markNamesConnectKey: string
  firstPlaySourceVo: FirstPlaySourceVo
  chapterCount: number
  inLibraryCount: number
  playChapterIndex: number
  fromShare: boolean
  lastChapterUtime: number
  startPreLoadNum: number
  corner: Corner
  crossChapter: boolean
  bookStatus: number
  bookCategory: number
  shareVo: ShareVo
  offlineDownloadInfo: OfflineDownloadInfo
  vipQualityType: number
  payChapterNum: number
  ratingPopup: RatingPopup
  bookType: number
  needInteractionTip: boolean
  needTriggerWarnTip: boolean
  farthestChapterIndex: number
  downloadSwitch: number
  interstitialAdSwitch: number
  performers: PerformersItem[]
  inLibrary: boolean
  vip: boolean
}

export interface ChapterResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
