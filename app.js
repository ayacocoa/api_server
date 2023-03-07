const express = require('express')
const app = express()
const joi = require('joi')

const cors = require('cors')
app.use(cors())

//解析表单的中间件
app.use(express.urlencoded({ extended: false }))
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})

//解析token的中间件
const expressJWT = require('express-jwt')
const config = require('./config')
app.use(expressJWT({secret:config.jwtSecretKey}).unless({path:[/^\/api/]}))


//导入router 用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

//导入并使用用户信息的路由模块
const userinfoRouter = require('./router/userinfo')
app.use('/my', userinfoRouter)
//导入并使用用户信息的路由模块
const artCateRouter = require('./router/artcate')
app.use('/my/article', artCateRouter)
// 导入并使用文章路由模块
const articleRouter = require('./router/article')
// 为文章的路由挂载统一的访问前缀 /my/article
app.use('/my/article', articleRouter)

//定义错误级别的中间件
app.use((err, req, res, next) => {
    //验证失败导致的错误
    if (err instanceof joi.ValidationError)
        return res.cc(err)
    //身份验证失败
    if (err.name === 'UnauthorizedError') 
        return res.cc('身份验证失败')
    //未知的错误
    res.cc(err)
})

app.listen(3007, () => {
    console.log('success 127.0.0.1:3007')
})
