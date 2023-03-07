const express = require('express')
const router = express.Router()

//导入函数处理模块
const user_handle = require('../router_handler/user')
//导入验证数据中间件
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

//注册新用户
router.post('/reguser', expressJoi(reg_login_schema), user_handle.regUser)
//登陆
router.post('/login', expressJoi(reg_login_schema), user_handle.login)
module.exports = router