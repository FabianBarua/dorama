import { Router } from 'express'
import { HelloWorldController } from '../controllers/helloWorld.controller'

const router = Router()
const helloWorldController = new HelloWorldController()

router.get('/hello', helloWorldController.getHelloWorld)
router.post('/hello', helloWorldController.postHelloWorld)

export default router
