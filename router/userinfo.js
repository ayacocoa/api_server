const express = require('express')
const router = express.Router()
const expressJoi = require('@escook/express-joi')

//挂载路由
// 导入路由处理函数
const userinfo_handler = require('../router_handler/userinfo')

//导入需要的验证规则
const { update_userinfo_schema, update_password_schema, update_avatar_schema } = require('../schema/user')
//获取用户基本信息
router.get('/userinfo', userinfo_handler.getUserInfo)
//更新用户信息的路由
router.post('/userinfo', expressJoi(update_userinfo_schema), userinfo_handler.updateUserInfo)
//更新密码的路由
router.post('/updatepwd', expressJoi(update_password_schema), userinfo_handler.updatePassword)
//更换头像的路由
router.post('/update/avater', expressJoi(update_avatar_schema),userinfo_handler.updateAvatar)
module.exports = router

