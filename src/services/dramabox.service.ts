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
import fs from 'fs/promises'
import path from 'path'

class DramaboxService {
  private readonly BASE_URL = 'https://sapi.dramaboxdb.com'
  private readonly cachePath = path.resolve(
    __dirname,
    '../../INFO/device-cache.json'
  )

  private async readIdsCache () {
    try {
      const raw = await fs.readFile(this.cachePath, 'utf8')
      const parsed = JSON.parse(raw)

      if (parsed?.deviceId && parsed?.androidId && parsed?.distinctId) {
        return parsed as {
          deviceId: string
          androidId: string
          distinctId: string
          createdAt?: number
        }
      }
    } catch (error) {
      console.warn('No cached device IDs found:', error)
    }

    return null
  }

  private async persistIds (ids: {
    deviceId: string
    androidId: string
    distinctId: string
    createdAt: number
  }) {
    await fs.mkdir(path.dirname(this.cachePath), { recursive: true })
    await fs.writeFile(this.cachePath, JSON.stringify(ids, null, 2), 'utf8')
  }

  constructor () {}

  private generateAndroidId () {
    return crypto.randomBytes(16).toString('hex')
  }

  private generateDistinctId () {
    return crypto.randomBytes(8).toString('hex')
  }

  private async resolveIds (
    deviceId?: string,
    androidId?: string,
    forceNew: boolean = false
  ) {
    const cached = forceNew ? null : await this.readIdsCache()

    const resolved = {
      deviceId: deviceId || cached?.deviceId || crypto.randomUUID(),
      androidId: androidId || cached?.androidId || this.generateAndroidId(),
      distinctId:
        (!forceNew && cached?.distinctId) || this.generateDistinctId(),
      createdAt: (!forceNew && cached?.createdAt) || Date.now()
    }

    const hasChanges =
      forceNew ||
      !cached ||
      cached.deviceId !== resolved.deviceId ||
      cached.androidId !== resolved.androidId ||
      cached.distinctId !== resolved.distinctId

    if (hasChanges) {
      await this.persistIds(resolved)
    }

    return resolved
  }

  // --- Token Methods ---

  private async fetchNewToken (
    ids: { deviceId: string; androidId: string; distinctId: string },
    language: string = 'es'
  ): Promise<string> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/ap001/bootstrap?timestamp=${timestamp}`

    const body = JSON.stringify({ distinctId: ids.distinctId })

    // Headers específicos para bootstrap (sin token, tn vacío)
    const signature = generateSn(
      timestamp,
      body,
      ids.deviceId,
      ids.androidId,
      ''
    )

    const locale = language === 'pt' ? 'pt_BR' : 'es_US'
    const countryCode = language === 'pt' ? 'BR' : 'PY'

    const headers: any = {
      version: '480',
      'package-name': 'com.storymatrix.drama',
      p: '47',
      cid: 'DRA1000042',
      apn: '2',
      'country-code': countryCode,
      mchid: '',
      mbid: '',
      tz: '180',
      language: language,
      mcc: '744',
      locale: locale,
      'device-id': ids.deviceId,
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
      'android-id': ids.androidId,
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
    token?: string,
    language: string = 'es'
  ) {
    let ids = await this.resolveIds(deviceId, androidId)

    const locale = language === 'pt' ? 'pt_BR' : 'es_US'
    const countryCode = language === 'pt' ? 'BR' : 'PY'

    const headers: any = {
      version: '480',
      'package-name': 'com.storymatrix.drama',
      p: '47',
      cid: 'DRA1000042',
      apn: '2',
      'country-code': countryCode,
      mchid: '',
      mbid: '',
      tz: '180',
      language: language,
      mcc: '744',
      locale: locale,
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
      'current-language': language,
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
      try {
        bearerToken = await this.fetchNewToken(ids, language)
      } catch (error) {
        console.warn('Token fetch failed, regenerating device IDs...', error)
        ids = await this.resolveIds(undefined, undefined, true)
        bearerToken = await this.fetchNewToken(ids, language)
      }
    }

    if (bearerToken) {
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

  public async getHome (
    params?: Partial<HomeRequest> & { language?: string }
  ): Promise<HomeResponse> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/he001/theater?timestamp=${timestamp}`

    const language = params?.language || 'es'
    const { language: _, ...restParams } = params || {}

    const defaultParams: HomeRequest = {
      homePageStyle: 0,
      isNeedRank: 1,
      index: 0,
      type: 0,
      channelId: 177,
      ...restParams
    }

    const body = JSON.stringify(defaultParams)
    const headers = await this.getCommonHeaders(
      true,
      timestamp,
      body,
      undefined,
      undefined,
      undefined,
      language
    )
    headers['is_root'] = '1'
    headers['is_emulator'] = '0'
    headers['is_vpn'] = '1'

    const response = await fetch(url, {
      method: 'POST',
      headers,
      body
    })

    console.log('📡 Response status:', response.status, response.statusText )

    console.log('🌐 Home URL:', url)

    console.log('🌍 Language:', language

    )
    if (!response.ok) {
      throw new Error(`Error fetching home: ${response.statusText}`)
    }

    const json = await response.json()
    console.log('🏠 Home response received')

    console.log('📋 Response JSON:', JSON.stringify(json) )
    return json as HomeResponse
  }

  public async search (
    keyword: string,
    language: string = 'es'
  ): Promise<BuscarKeywordsResponse> {
    const timestamp = Date.now().toString()
    const url = `${this.BASE_URL}/drama-box/search/suggest?timestamp=${timestamp}`

    console.log('🌐 Search URL:', url)
    console.log('🌍 Language:', language)
    const body = JSON.stringify({ keyword })
    console.log('📝 Request body:', body)

    const headers = await this.getCommonHeaders(
      true,
      timestamp,
      body,
      undefined,
      undefined,
      undefined,
      language
    )
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
