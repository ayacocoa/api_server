// 路由处理函数
//导入数据库操作模块
const db = require('../db/index')
//获取文章分类列表的处理函数
exports.getArtCates = (req, res) => {
    const sql = 'select * from ev_article_cate where is_delete = 0 order by id asc'
    //调用db.query()执行SQL语句
    db.query(sql, (err, results) => {
        if (err)
            return res.cc('err')
        res.send({
            status: 0,
            message: '获取文章分类成功',
            data: results
        })
    })
}
//新增文章分类的处理函数
exports.addArticleCates = (req, res) => {
    //定义查重的输出语句
    const sql = 'select * from ev_article_cate where name=? or alias=?'
    //执行查重语句
    db.query(sql, [req.body.name, req.body.alias], (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length === 2)
            return res.cc('分类名称和分类别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称和分类别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用')
        // 定义插入文章分类的SQL语句
        const sql = 'insert into ev_article_cate set ?'
        // 执行插入语句
        db.query(sql, req.body, (err, results) => {
            if (err)
                return res.cc(err)
            if (results.affectedRows !== 1)
                return res.cc('新增文章失败')
            res.cc('success', 0)
        })
    })
}
//删除文章分类的处理函数
exports.deleteCateById = (req, res) => {
    const sql = 'update ev_article_cate set is_delete=1 where id=?'
    db.query(sql, [req.params.id], (err, results) => {
        if (err)
            return res.cc(err)
        if (results.affectedRows !== 1)
            return res.cc('删除失败')
        res.cc('success')
    })
}
//根据id 获取文章分类
exports.getArtCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id=?'
    db.query(sql, req.params.id, (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length !== 1)
            return res.cc('获取失败')
        res.send({
            status: 0,
            mesdsage: 'success',
            data: results[0],
        })
    })
}
//更新文章分类
exports.updateCateById = (req, res) => {
    const sql = 'select * from ev_article_cate where id != ? and (name = ? or alias = ?) '
    //执行查重语句
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, results) => {
        if (err)
            return res.cc(err)
        if (results.length === 2)
            return res.cc('分类名称和分类别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name && results[0].alias === req.body.alias)
            return res.cc('分类名称和分类别名都被占用')
        if (results.length === 1 && results[0].name === req.body.name)
            return res.cc('分类名称被占用')
        if (results.length === 1 && results[0].alias === req.body.alias)
            return res.cc('分类别名被占用')
        // 定义插入文章分类的SQL语句
        const sql = 'update ev_article_cate set ? where id=?'
        // 执行插入语句
        db.query(sql, [req.body, req.body.id], (err, results) => {
            if (err)
                return res.cc(err)
            if (results.affectedRows !== 1)
                return res.cc('更新文章失败')
            res.cc('success', 0)
        })
    })
}
