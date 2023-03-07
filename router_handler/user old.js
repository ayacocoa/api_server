//定义和用户相关的的处理函数
const db = require('../db/index')
const bcrypt = require('bcryptjs')

//注册
exports.regUser = (req, res) => {
    const userinfo = req.body
    // console.log(req.body)
    if (!userinfo.username || !userinfo.password)
        // return res.send({ stutus: 1, message: '用户名或密码不能为空' })
        return res.cc('用户名或密码不能为空')
    
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
    userinfo.password = bcrypt.hashSync(userinfo.password,10)
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
        res.cc('success',0)

    })
}

//登陆
exports.login = (req, res) => {
    res.send('login OK')
}