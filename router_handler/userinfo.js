const db = require('../db/index')
const bcrypt = require('bcryptjs')

// 获取用户基本信息处理函数
exports.getUserInfo = (req, res) => {
    const sql = 'select id,username,nickname,email,user_pic from ev_users where id=?'
    //调用db.query执行SQL语句
    db.query(sql, req.user.id, (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length != 1)
            return res.cc('失败')
        res.send({
            status: 0,
            message: '获取成功',
            data: results[0],
        })
    })
}
//更新用户基本信息处理函数
exports.updateUserInfo = (req, res) => {
    //定义SQL语句
    const sql = 'update ev_users set ? where id = ?'
    db.query(sql, [req.body, req.body.id], (err, results) => {
        if (err)
            return res.cc(err)
        if (1 != results.affectedRows)
            return res.cc('更新失败')
        //成功 
        res.cc('update success', 0)
    })
}
// 更新用户密码的处理函数
exports.updatePassword = (req, res) => {
    const sql = 'select * from ev_users where id = ?'
    db.query(sql, req.user.id, (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length != 1)
            return res.cc('用户不存在')

        //判断旧密码是否正确
        const compareResult = bcrypt.compareSync(req.body.oldPwd, results[0].password)
        if (!compareResult)
            return res.cc('旧密码错误')
        //定义更新密码语句
        const sql = 'update ev_users set password=? where id=?'
        //加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)
        db.query(sql, [newPwd, req.user.id], (err, results) => {
            if (err)
                return res.cc(err)
            if (results.affectedRows != 1)
                return res.cc('更新失败')
            res.cc('success', 0)
        })

    })
}
// 更新用户头像的处理函数
exports.updateAvatar = (req, res) => {
    const sql = 'update ev_users set user_pic=? where id=?'
    db.query(sql, [req.body.avatar, req.user.id], (er, results) => {
        if (err)
            return res.cc(err)
        if (results.length != 1)
            return res.cc('更换头像失败')
        //更新头像完成
        res.cc('success')
    })
}
