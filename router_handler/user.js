//定义和用户相关的的处理函数
const db = require('../db/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')
//注册函数
exports.regUser = (req, res) => {
    const userinfo = req.body
    // console.log(req.body)
    // if (!userinfo.username || !userinfo.password)
    //     // return res.send({ stutus: 1, message: '用户名或密码不能为空' })
    //     return res.cc('用户名或密码不能为空')

    const sqlStr = 'select * from ev_users where username=?'
    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) {
            // return res.send({ status: 1, message: err.message })
            return res.cc(err)
        }
        if (results.length > 0) {
            // return res.send({ stutus: 1, message: '用户名已被占用' })
            return res.cc('用户名已被占用')
        }
    })
    // 加密密码
    // console.log(userinfo.password)
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo.password)
    const sql = 'insert into ev_users set ?'
    db.query(sql, { username: userinfo.username, password: userinfo.password }, (err, results) => {
        if (err) {
            // return res.send({status:1,message:err.message})
            return res.cc(err)
        }
        if (results.affectedRows != 1) {
            // return res.send({status:1,message:"注册失败"})
            return res.cc('注册失败')
        }
        // res.send({status:0,message:'success'})
        res.cc('success', 0)

    })
}

//登陆函数
exports.login = (req, res) => {
    //接受表单数据
    const userinfo = req.body
    //定义SQL语句
    const sql = 'select * from ev_users where username = ? '
    //执行语句，根据用户名查询信息
    db.query(sql, userinfo.username, (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length != 1) //获取小于1
            return res.cc('登录失败')

        // 判断密码是否正确
        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult)
            return res.cc('密码不匹配')
        // res.send('success')
        // 在服务器端生成Token的字符串
        const user = {
            ...results[0],
            password: null,
            user_pic: null,
        }
        //对用户信息加密，生成Token字符串
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: config.expiresIn
        })
        // console.log(tokenStr)
        //调用res.send（）响应给客户端
        res.send({
            status: 0,
            message: 'success',
            token: 'Bearer' + ' ' + tokenStr
        })
    })
    // res.send('login OK')
}