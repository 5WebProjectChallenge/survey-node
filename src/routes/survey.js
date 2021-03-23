import {Router} from 'express'
const survey = require('../controllers/survey.controller.js')
const router = Router()

// router.get('/:id',user.getUser)
router.post('/addSurvey',survey.addSurvey)
router.post('/getSurvey',survey.getSurvey)
// router.post('/update/:id',survey.updateUser)

console.log("router",router)
export default router