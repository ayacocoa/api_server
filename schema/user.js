// 导入定义验证规则
const joi = require('joi')

//定义规则
const username = joi.string(). alphanum(). min(1).max(10). required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

//定义id nickname email 的验证规则
const id = joi.number().integer().min(1).required()
const nickname = joi.string().required()
const email = joi.string().email().required()
//定义头像规则
const avatar = joi.string().dataUri().required()

//定义验证注册登录对象
exports.reg_login_schema = {
    body: {
        username,
        password,        
    },
}
// 验证规则对象-更新用户基本信息
exports.update_userinfo_schema = {
    body: {
        id: id,
        nickname: nickname,
        email:email,
    },
    
}
// 重置密码
exports.update_password_schema = {
    body: {
        oldPwd: password,
        //joi.ref('oldPwd')  表示与原密码一致
        //not(joi.ref('oldPwd'))  不一致
        //.concat 合并两种验证规则
        newPwd:joi.not(joi.ref('oldPwd')).concat(password),
    }
}
//更换头像
exports.update_avatar_schema = {
    body: {
        avatar
    }
}