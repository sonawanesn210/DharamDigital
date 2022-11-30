const express = require('express');
const router = express.Router();
const {createUser,loginUser}=require('../controllers/userController')
const {createCampaign,getCamapign,updateCampaign} =require('../controllers/campaignController')
const {authorization}=require('../middleware/middleware')
router.post('/register',createUser)
router.post('/api/login',loginUser)
router.post('/campaign',createCampaign)

router.get('/api/redirect',getCamapign)

router.put('/api/admin/campaigns/:id/toggle',authorization,updateCampaign)
module.exports = router;