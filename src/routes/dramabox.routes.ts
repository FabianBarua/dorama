import { Router } from 'express'
import { DramaboxController } from '../controllers/dramabox.controller'

const router = Router()
const dramaboxController = new DramaboxController()

router.get('/home', dramaboxController.getHome)
router.get('/search', dramaboxController.search)
router.post('/getchapters', dramaboxController.getChapters)

export default router
