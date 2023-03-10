//定义验证规则的模块
const joi = require('joi')
//定义 name 和 alias 的验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()
const id = joi.number().integer().min(1).required()

//向外共享验证的规则
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}
exports.delete_cate_schema = {
    params: {
        id,
    }
}
exports.get_cate_schema = {
    params: {
        id,
    }
}
exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    }
}