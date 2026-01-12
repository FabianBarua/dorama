import { HomeResponse } from '../types/HOME RESPONSE'
import { BuscarKeywordsResponse } from '../types/BUSCAR KEYWORDS RESPONSE'
import { ChapterResponse } from '../types/CHAPTER RESPONSE'
import { GetBearerResponse } from '../types/GET BEARER RESPONSE'
import {
  HomeRequest,
  SearchRequest,
  GetChaptersRequest
} from '../types/requests.types'
import { generateSn } from '../utils/signature.util'
import crypto from 'crypto'

class DramaboxService {
  private readonly BASE_URL = 'https://sapi.dramaboxdb.com'

  constructor () {}

  private generateIds () {
    return {
      deviceId: crypto.randomUUID(),
      androidId: crypto.randomBytes(16).toString('hex')
    }
  }

  // --- Token Methods ---

  private async fetchNewToken (
    deviceId: string,
    androidId: string
  ): Promise<string> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/ap001/bootstrap?timestamp=${timestamp}`

    const body = JSON.stringify({ distinctId: '8ac0c3633a93fce5' })

    // Headers específicos para bootstrap (sin token, tn vacío)
    const signature = generateSn(timestamp, body, deviceId, androidId, '')

    const headers: any = {
      version: '480',
      'package-name': 'com.storymatrix.drama',
      p: '47',
      cid: 'DRA1000042',
      apn: '2',
      'country-code': '',
      mchid: '',
      mbid: '',
      tz: '180',
      language: 'es',
      mcc: '744',
      locale: 'es_US',
      'device-id': deviceId,
      nchid: 'DRA1000042',
      instanceid: '',
      md: 'Redmi Note 8',
      'store-source': 'store_google',
      mf: 'XIAOMI',
      'local-time': new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' -0300'),
      'time-zone': '-0300',
      brand: 'Xiaomi',
      lat: '0',
      'current-language': 'es',
      ov: '13',
      userid: '',
      afid: `${Date.now()}-${Math.floor(Math.random() * 10000000000000000000)}`,
      'android-id': androidId,
      srn: '1080x2340',
      ins: '',
      build: 'Build/TQ2B.230505.005.A1',
      pline: 'ANDROID',
      vn: '4.8.0',
      'over-flow': 'new-fly',
      tn: '',
      sn: signature,
      'active-time': '559',
      'content-type': 'application/json; charset=UTF-8',
      'accept-encoding': 'gzip',
      'user-agent': 'okhttp/4.10.0'
    }

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      throw new Error(`Error fetching bearer token: ${response.statusText}`)
    }

    const data = (await response.json()) as GetBearerResponse

    if (!data.success || !data.data?.user?.token) {
      throw new Error('Invalid bearer token response')
    }

    const token = `Bearer ${data.data.user.token}`
    console.log('✅ New Bearer token generated')
    return token
  }

  // --- API Request Helpers ---

  private async getCommonHeaders (
    includeBearer: boolean = true,
    timestamp?: string,
    body?: string,
    deviceId?: string,
    androidId?: string,
    token?: string
  ) {
    // Usar IDs proporcionados o generar nuevos
    const ids =
      deviceId && androidId ? { deviceId, androidId } : this.generateIds()

    const headers: any = {
      version: '480',
      'package-name': 'com.storymatrix.drama',
      p: '47',
      cid: 'DRA1000042',
      apn: '2',
      'country-code': 'PY',
      mchid: '',
      mbid: '',
      tz: '180',
      language: 'es',
      mcc: '744',
      locale: 'es_US',
      'device-id': ids.deviceId,
      nchid: 'DRA1000042',
      instanceid: '6d01ec0d9499e0c15d3bfa268352efbf',
      md: 'Redmi Note 8',
      'store-source': 'store_google',
      mf: 'XIAOMI',
      'local-time': new Date()
        .toISOString()
        .replace('T', ' ')
        .replace('Z', ' -0300'),
      'time-zone': '-0300',
      brand: 'Xiaomi',
      lat: '0',
      'current-language': 'es',
      ov: '13',
      userid: '389033070',
      afid: `${Date.now()}-${Math.floor(Math.random() * 10000000000000000000)}`,
      'android-id': ids.androidId,
      srn: '1080x2340',
      ins: `${Date.now()}`,
      build: 'Build/TQ2B.230505.005.A1',
      pline: 'ANDROID',
      vn: '4.8.0',
      'over-flow': 'new-fly',
      'active-time': '384419',
      'content-type': 'application/json; charset=UTF-8',
      'accept-encoding': 'gzip',
      'user-agent': 'okhttp/4.10.0'
    }

    let bearerToken = token || ''
    if (includeBearer && !bearerToken) {
      // Obtener nuevo token solo si no se proporcionó uno
      bearerToken = await this.fetchNewToken(ids.deviceId, ids.androidId)
      headers['tn'] = bearerToken
    } else if (bearerToken) {
      headers['tn'] = bearerToken
    }

    // Generar firma 'sn' si se proporcionan timestamp y body
    if (timestamp && body !== undefined) {
      const signature = generateSn(
        timestamp,
        body,
        ids.deviceId,
        ids.androidId,
        bearerToken
      )
      headers['sn'] = signature
    }

    return headers
  }

  public async getHome (params?: Partial<HomeRequest>): Promise<HomeResponse> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/he001/theater?timestamp=${timestamp}`

    const defaultParams: HomeRequest = {
      homePageStyle: 0,
      isNeedRank: 1,
      index: 0,
      type: 0,
      channelId: 177,
      ...params
    }

    const body = JSON.stringify(defaultParams)
    const headers = await this.getCommonHeaders(true, timestamp, body)
    headers['is_root'] = '1'
    headers['is_emulator'] = '0'
    headers['is_vpn'] = '1'

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      throw new Error(`Error fetching home: ${response.statusText}`)
    }

    return (await response.json()) as HomeResponse
  }

  public async search (keyword: string): Promise<BuscarKeywordsResponse> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/search/suggest?timestamp=${timestamp}`

    console.log('🌐 Search URL:', url)
    const body = JSON.stringify({ keyword })
    console.log('📝 Request body:', body)

    const headers = await this.getCommonHeaders(true, timestamp, body)
    console.log('📋 Request headers:', headers)

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    console.log('📡 Response status:', response.status, response.statusText)

    if (!response.ok) {
      throw new Error(`Error searching: ${response.statusText}`)
    }

    const json = await response.json()
    console.log('📥 Raw JSON response:', JSON.stringify(json, null, 2))
    return json as BuscarKeywordsResponse
  }

  public async getChapters (
    params: Partial<GetChaptersRequest>
  ): Promise<ChapterResponse> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/chapterv2/batch/load?timestamp=${timestamp}`

    const startUpKey = `${Math.random()
      .toString(36)
      .substring(2)}-${Math.random().toString(36).substring(2)}`

    // Petición única - devuelve solo un lote
    const defaultParams: GetChaptersRequest = {
      boundaryIndex: 0,
      comingPlaySectionId: -1,
      index: -1,
      currencyPlaySource: 'discover_177_rec',
      needEndRecommend: 0,
      currencyPlaySourceName: '首页发现_Descubrir_推荐列表',
      preLoad: false,
      rid: '',
      pullCid: '',
      loadDirection: 0,
      startUpKey,
      bookId: '',
      ...params
    }

    const body = JSON.stringify(defaultParams)
    const headers = await this.getCommonHeaders(true, timestamp, body)
    headers['version'] = '511'
    headers['is_root'] = '0'
    headers['is_emulator'] = '0'
    headers['is_vpn'] = '1'

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    if (!response.ok) {
      throw new Error(`Error fetching chapters: ${response.statusText}`)
    }

    return (await response.json()) as ChapterResponse
  }
}

export default new DramaboxService()
