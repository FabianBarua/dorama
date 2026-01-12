import { Request, Response } from 'express'
import dramaboxService from '../services/dramabox.service'

export class DramaboxController {
  public async getHome (req: Request, res: Response): Promise<void> {
    try {
      const { homePageStyle, isNeedRank, index, type, channelId, language } =
        req.query

      const params: any = {}
      if (homePageStyle) params.homePageStyle = Number(homePageStyle)
      if (isNeedRank) params.isNeedRank = Number(isNeedRank)
      if (index) params.index = Number(index)
      if (type) params.type = Number(type)
      if (channelId) params.channelId = Number(channelId)
      if (language && typeof language === 'string') params.language = language

      const response = await dramaboxService.getHome(params)

      res.status(200).json({
        success: true,
        data: response.data
      })
    } catch (error: any) {
      console.error('❌ Error in getHome:', error)
      res.status(500).json({
        success: false,
        message: error.message || 'Error fetching home data'
      })
    }
  }

  public async search (req: Request, res: Response): Promise<void> {
    try {
      const { keyword, language } = req.query

      console.log(
        '🔍 Search request - keyword:',
        keyword,
        'language:',
        language
      )

      if (!keyword || typeof keyword !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Keyword parameter is required'
        })
        return
      }

      const lang = typeof language === 'string' ? language : 'es'
      const response = await dramaboxService.search(keyword, lang)
      console.log('📦 Response from API:', JSON.stringify(response, null, 2))
      console.log('📊 Response.data:', JSON.stringify(response.data, null, 2))

      // La API de search retorna suggestList, no hotVideoList
      const searchData = {
        searchPresetWords: response.data.keyword || '',
        hotVideoList: response.data.suggestList || []
      }

      console.log(
        '✅ Search data to send:',
        JSON.stringify(searchData, null, 2)
      )

      res.status(200).json({
        success: true,
        data: searchData
      })
    } catch (error: any) {
      console.error('❌ Error in search:', error)
      res.status(500).json({
        success: false,
        message: error.message || 'Error searching'
      })
    }
  }

  public async getChapters (req: Request, res: Response): Promise<void> {
    try {
      const bookId = (req.query.bookId as string) || req.body.bookId
      console.log('📚 getChapters request - bookId:', bookId)
      console.log('📦 getChapters body:', req.body)

      if (!bookId) {
        res.status(400).json({
          success: false,
          message: 'bookId parameter is required'
        })
        return
      }

      const params: any = {
        bookId,
        ...req.body
      }

      const response = await dramaboxService.getChapters(params)
      res.status(200).json({
        success: true,
        data: response.data
      })
    } catch (error: any) {
      console.error('❌ Error in getChapters:', error)
      res.status(500).json({
        success: false,
        message: error.message || 'Error fetching chapters'
      })
    }
  }
}
