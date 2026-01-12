export interface MembershipCardInfo {
  membershipTitle: string
  points: number
  claimedPoints: boolean
  hitNewPointsUI: boolean
  membershipStatus: number
  shareId: string
  membershipCardShareLink: string
  membershipCardShareDescription: string
  shareApps: string[]
  joinMembershipTitle: string
}

export interface MembershipInfo {
  membershipStatus: number
  membershipCardInfo: MembershipCardInfo
  memberExperienceOptimize: number
}

export interface User {
  uid: number
  visitorCount: number
  followCount: number
  lastLoginTime: number
  state: string
  country: string
  isVip: number
  servicePeriod: number
  isExVip: number
  membershipInfo: MembershipInfo
  token: string
  uploadFirebase: number
  homePageStyle: number
  revenueDisplay: string
}

export interface AttributionPubParam {
  chid: string
  chidTime: number
  attributeSuccess: boolean
  protected: boolean
}

export interface ClipboardPopup {
  popupCopy: string
  buttonCopy: string
  cancelCopy: string
}

export interface Data {
  user: User
  bindDevice: boolean
  bindLogin: boolean
  idfaFlag: boolean
  idfaBonus: number
  idfaTipTimes: number
  timeout: number
  attributionPubParam: AttributionPubParam
  clipboardCue: number
  persona: string
  clipboardPopup: ClipboardPopup
  ratePop: boolean
  homePageStyle: number
  appThemeColorSwitch: number
  appThemeColor: number
  needCompliancePop: number
  persionalRecommend: number
}

export interface GetBearerResponse {
  data: Data
  status: number
  message: string
  timestamp: number
  ip: string
  region: string
  path: string
  success: boolean
}
