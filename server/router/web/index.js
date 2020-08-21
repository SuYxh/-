module.exports = app =>{
    const router = require('express').Router()
    // 初始化新闻的路由，测试时候录入数据使用，正式上线不应该使用
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category')

    const Article = mongoose.model('Article')
    router.get('/news/init',async (req,res) => {

        const parent = await Category.findOne({
            name:'新闻分类'
        })
        console.log('parent的数据：',parent)   // parent的数据： { _id: 5f3f519c2c51685ac0ba7c9f, name: '新闻分类', __v: 0 }
        //  lean() 表示取纯粹的 json
        const cats = await Category.find().where({
            parent:parent
        }).lean()
        console.log('cats',cats)   

        const newsTitles = ["英雄调整情报丨杨戬/苏烈加强，阿古朵降温，蔡文姬优化", "主播入驻游戏圈，发帖赢大奖！", "《王者荣耀》品牌代言人首登场，欢迎真爱玩家加入战场", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "策划有话说丨新一系野刀即将到来", "三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "王者破浪之战暑期狂欢，专属豪礼送上！", "2020QQ名人赛《王者荣耀》第二期开赛，蓝盈莹、曾可妮携手带来峡谷首秀", "腾讯微视王者嘉年华来袭，6位姐姐变身峡谷女英雄陪你开“浪”", "《天天爱消除》七周年庆欢乐开启，樱桃小丸子治愈来袭！", "大神来了！快来游戏社区与大神在线探讨新英雄阿古朵", "三分夏日内容征集活动上线，投稿赢万元皮肤购买金！", "《圣斗士星矢手游》2周年庆典，每日免费十连抽、神圣衣狮子座全员送", "周年庆表现道具设计大赛投票开启公告", "《御龙在天手游》全新资料篇“征战四方”震撼来袭", "英雄故事 | 前方高能！益城山大王阿古朵来了！", "《斗破苍穹手游》年度资料片“远古八族“上线，炎族归位，圣灵争锋！", "王者荣耀官方客服招聘", "王者荣耀周年庆表现道具设计大赛现已开启！", "百力滋X王者荣耀 大手笔赠送上百个英雄手办、永久皮肤！", "蓝方惊现自走机甲？为你揭秘蜀地木流牛马的精妙机关", "破浪对决中的战船是……戳开解锁吴地艨艟的“身世之谜”！", "红方高地惊现新建筑？一起探秘魏都代表建筑“高阙”！", "王者荣耀×名创优品惊喜联名来袭！", "QQ飞车手游公测2周年开启，登录就送永久劳斯莱斯！", "铂金铁盘比萨·【王者】光环降临！限时买一送一！", "保利剧院公司、保利演艺携手腾讯新文创、腾讯游戏王者荣耀，共同探索文化演艺新边界", "英雄调整情报丨鬼谷子加强，玄策/干将优化", "新皮肤爆料丨一念通天，神魔无惧，李信世冠新装即将登场！", "正式服预告⑥ | 新展示背景、新地图氛围，三分奇兵即将上线", "正式服预告⑤ | 体验大升级！背包轻松整理，开黑预约无阻", "【星元部件爆料】公孙离-觅星灵兔", "正式服预告④：荣耀战令爆料第二弹，暗夜都市，游侠将至！", "正式服预告③：荣耀战令新皮肤登场，“大镖客三兄弟”齐聚！", "王者峡谷云赛舟，今年端午特别“浪”", "正式服预告②：新版本峡谷调整抢先看，法术上新装，墙体能互动", "正式服预告①：新版本三分之地，赛季皮肤抢先看", "“Spark More”王者荣耀打造玩家新触点，让游戏焕活更多传统文化的可能", "腾讯游戏年度发布会，一张图带你看天美最新动态！", "集合，准备上船！——谁是峡谷最佳龙舟手？", "英雄调整情报丨貂蝉加强，赵云优化", "峡谷端午过节指南", "云中君源·梦皮肤海报投票结果公布"]
        // 将上面的标题转成对象数组
        const newsList = newsTitles.map(title => {
            // 从cats里面复制一个数组出来再去排序，不要影响 cats数组本身
            // Math.random() - 0.5 得到的结果是大于0 或者小于 0 决定排序方式
            const randomCats = cats.slice(0).sort((a,b) => Math.random() - 0.5)
            return {
                categories:randomCats.slice(0,2),
                title:title
            }
        })

        // 先清空数据 
        await Article.deleteMany({})
        // 插入我们的数据
        await Article.insertMany(newsList)
        res.send(newsList)
    })


    // 新闻列表展示接口，用于前端调用
    router.get('/news/list',async (req,res) => {
        /**  此种方式简单粗暴，但是有瑕疵
        const parent = await Category.findOne({
            name:'新闻分类'
        }).populate({
            path:'children',
            // 注释掉下面这个 populate {} 返回的是什么呢？  新闻分类的几个子分类： 新闻、公告、赛事、活动 
            populate:{
                path:'newsList'
            }
        }).lean()
        */
        // 聚合查询 聚合查询的参数  聚合管道
        const parent = await Category.findOne({
            name:'新闻分类'
        })
        const cats = await Category.aggregate([
            // match:条件查询 类似于 where  lookup 类似于 join
            // 第一个 parent表示 字段  ，第二个 parent为 上面代码中的parent，上级分类
            // 通过match过滤数据
            {$match:{parent:parent._id}},
            // 关联查询
            {
                $lookup:{
                    from:'articles',     // 集合的名字
                    localField:'_id',
                    foreignField:'categories' ,
                    as:'newsList',
                }
            },
            // 将查出来的数据按照需要进行修改
            {
                // 添加字段
                $addFields:{
                    newsList:{$slice:['$newsList',5]}
                }
            },
        ])
        
        const subCats = cats.map(v => v._id)
        cats.unshift({
            name:'热门',
            newsList: await Article.find().where({
                categories : {$in: subCats}
            }).populate('categories').limit(5).lean() 
        })

        cats.map(cat => {
            cat.newsList.map(news => {
                news.categoryName = (cat.name === '热门') ? news.categories[0].name : cat.name
                return news
            })
        })

        res.send(cats)
    })




    app.use('/web/api',router)
}


/**
 *  randomCats 数据展示：
 * randomCats [
  {
    _id: 5f3f51a72c51685ac0ba7ca0,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '新闻',
    __v: 0
  },
  {
    _id: 5f3f51b42c51685ac0ba7ca2,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '活动',
    __v: 0
  },
  {
    _id: 5f3f51ba2c51685ac0ba7ca3,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '赛事',
    __v: 0
  },
  {
    _id: 5f3f51ae2c51685ac0ba7ca1,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '公告',
    __v: 0
  }
]


cats 的数据展示

cats [
  {
    _id: 5f3f51a72c51685ac0ba7ca0,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '新闻',
    __v: 0
  },
  {
    _id: 5f3f51ae2c51685ac0ba7ca1,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '公告',
    __v: 0
  },
  {
    _id: 5f3f51b42c51685ac0ba7ca2,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '活动',
    __v: 0
  },
  {
    _id: 5f3f51ba2c51685ac0ba7ca3,
    parent: 5f3f519c2c51685ac0ba7c9f,
    name: '赛事',
    __v: 0
  }
]
 */