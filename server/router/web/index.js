module.exports = app => {
    const router = require('express').Router()
    // 初始化新闻的路由，测试时候录入数据使用，正式上线不应该使用
    const mongoose = require('mongoose');
    const Category = mongoose.model('Category')

    const Article = mongoose.model('Article')

    const Hero = mongoose.model('Hero')


    // 新闻内容导入
    router.get('/news/init', async (req, res) => {

        const parent = await Category.findOne({
            name: '新闻分类'
        })
        console.log('parent的数据：', parent)   // parent的数据： { _id: 5f3f519c2c51685ac0ba7c9f, name: '新闻分类', __v: 0 }
        //  lean() 表示取纯粹的 json
        //  where 表示 分类是属于谁的
        const cats = await Category.find().where({
            parent: parent
        }).lean()
        console.log('cats', cats)

        const newsTitles = ["英雄调整情报丨杨戬/苏烈加强，阿古朵降温，蔡文姬优化", "主播入驻游戏圈，发帖赢大奖！", "《王者荣耀》品牌代言人首登场，欢迎真爱玩家加入战场", "“缘起峡谷，情定七夕”——《王者荣耀》七夕告白季，邀你来峡谷，表达爱！", "叮！你的潇潇子已抵达王者营地", "策划有话说丨新一系野刀即将到来", "三分之地，阵营对决赢手机周边，快来参与！", "曲韵芳华丨经典咏流传 《数字化破局》新文创微纪录片首期全网上线", "王者破浪之战暑期狂欢，专属豪礼送上！", "2020QQ名人赛《王者荣耀》第二期开赛，蓝盈莹、曾可妮携手带来峡谷首秀", "腾讯微视王者嘉年华来袭，6位姐姐变身峡谷女英雄陪你开“浪”", "《天天爱消除》七周年庆欢乐开启，樱桃小丸子治愈来袭！", "大神来了！快来游戏社区与大神在线探讨新英雄阿古朵", "三分夏日内容征集活动上线，投稿赢万元皮肤购买金！", "《圣斗士星矢手游》2周年庆典，每日免费十连抽、神圣衣狮子座全员送", "周年庆表现道具设计大赛投票开启公告", "《御龙在天手游》全新资料篇“征战四方”震撼来袭", "英雄故事 | 前方高能！益城山大王阿古朵来了！", "《斗破苍穹手游》年度资料片“远古八族“上线，炎族归位，圣灵争锋！", "王者荣耀官方客服招聘", "王者荣耀周年庆表现道具设计大赛现已开启！", "百力滋X王者荣耀 大手笔赠送上百个英雄手办、永久皮肤！", "蓝方惊现自走机甲？为你揭秘蜀地木流牛马的精妙机关", "破浪对决中的战船是……戳开解锁吴地艨艟的“身世之谜”！", "红方高地惊现新建筑？一起探秘魏都代表建筑“高阙”！", "王者荣耀×名创优品惊喜联名来袭！", "QQ飞车手游公测2周年开启，登录就送永久劳斯莱斯！", "铂金铁盘比萨·【王者】光环降临！限时买一送一！", "保利剧院公司、保利演艺携手腾讯新文创、腾讯游戏王者荣耀，共同探索文化演艺新边界", "英雄调整情报丨鬼谷子加强，玄策/干将优化", "新皮肤爆料丨一念通天，神魔无惧，李信世冠新装即将登场！", "正式服预告⑥ | 新展示背景、新地图氛围，三分奇兵即将上线", "正式服预告⑤ | 体验大升级！背包轻松整理，开黑预约无阻", "【星元部件爆料】公孙离-觅星灵兔", "正式服预告④：荣耀战令爆料第二弹，暗夜都市，游侠将至！", "正式服预告③：荣耀战令新皮肤登场，“大镖客三兄弟”齐聚！", "王者峡谷云赛舟，今年端午特别“浪”", "正式服预告②：新版本峡谷调整抢先看，法术上新装，墙体能互动", "正式服预告①：新版本三分之地，赛季皮肤抢先看", "“Spark More”王者荣耀打造玩家新触点，让游戏焕活更多传统文化的可能", "腾讯游戏年度发布会，一张图带你看天美最新动态！", "集合，准备上船！——谁是峡谷最佳龙舟手？", "英雄调整情报丨貂蝉加强，赵云优化", "峡谷端午过节指南", "云中君源·梦皮肤海报投票结果公布"]
        // 将上面的标题转成对象数组
        const newsList = newsTitles.map(title => {
            // 从cats里面复制一个数组出来再去排序，不要影响 cats数组本身，所以使用了slice
            // Math.random() - 0.5 得到的结果是大于0 或者小于 0 决定排序方式
            const randomCats = cats.slice(0).sort((a, b) => Math.random() - 0.5)
            return {
                categories: randomCats.slice(0, 2),
                title: title
            }
        })

        // 先清空数据 
        // deleteMany({}) 以 任意的条件做查询 并删除
        await Article.deleteMany({})
        // 插入我们的数据
        await Article.insertMany(newsList)
        res.send(newsList)
    })



    // 新闻列表展示接口，用于前端调用
    router.get('/news/list', async (req, res) => {
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
            name: '新闻分类'
        })
        const cats = await Category.aggregate([
            // match:条件查询 类似于 where  lookup 类似于 join
            // 第一个 parent表示 字段  ，第二个 parent为 上面代码中的parent，上级分类
            // 通过match过滤数据
            { $match: { parent: parent._id } },
            // 关联查询
            {
                $lookup: {
                    from: 'articles',     // 集合的名字
                    localField: '_id',
                    foreignField: 'categories',
                    as: 'newsList',
                }
            },
            // 将查出来的数据按照需要进行修改
            {
                // 添加字段
                $addFields: {
                    newsList: { $slice: ['$newsList', 5] }
                }
            },
        ])

        const subCats = cats.map(v => v._id)
        cats.unshift({
            name: '热门',
            newsList: await Article.find().where({
                categories: { $in: subCats }
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


    // 英雄列表--提取官网英雄数据
    /**  谷歌浏览器导入英雄数据的代码
     *  $$ 两个美元符号选到的是一个数组，所以这里使用了 $$('h3', el)[0].innerHTML,
     * $$('.hero-nav > li').map((li, i) => {
                return {
                    name: li.innerText,
                    heros: $$('li', $$('.hero-list')[i]).map(el => {
                        return {
                            name: $$('h3', el)[0].innerHTML,
                            avatar: $$('img', el)[0].src
                        }
                    })
                }
            })
     */
    //  $$('.hero-nav > li').map(li => li.innerText)  获取英雄分类列表  (7) ["热门", "战士", "法师", "坦克", "刺客", "射手", "辅助"]






    // router.get('/heroes/init', async (req, res) => {
    //     await Hero.deleteMany({})
    //     const rawData = [{ "name": "热门", "heroes": [{ "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }] }, { "name": "战士", "heroes": [{ "name": "赵云", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/107/107.jpg" }, { "name": "钟无艳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/117/117.jpg" }, { "name": "吕布", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/123/123.jpg" }, { "name": "曹操", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/128/128.jpg" }, { "name": "典韦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/129/129.jpg" }, { "name": "宫本武藏", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/130/130.jpg" }, { "name": "达摩", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/134/134.jpg" }, { "name": "老夫子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/139/139.jpg" }, { "name": "关羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/140/140.jpg" }, { "name": "露娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/146/146.jpg" }, { "name": "花木兰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/154/154.jpg" }, { "name": "亚瑟", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/166/166.jpg" }, { "name": "孙悟空", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/167/167.jpg" }, { "name": "刘备", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/170/170.jpg" }, { "name": "杨戬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/178/178.jpg" }, { "name": "雅典娜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/183/183.jpg" }, { "name": "哪吒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/180/180.jpg" }, { "name": "铠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/193/193.jpg" }, { "name": "狂铁", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/503/503.jpg" }, { "name": "李信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/507/507.jpg" }, { "name": "盘古", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/529/529.jpg" }] }, { "name": "法师", "heroes": [{ "name": "小乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/106/106.jpg" }, { "name": "墨子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/108/108.jpg" }, { "name": "妲己", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/109/109.jpg" }, { "name": "嬴政", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/110/110.jpg" }, { "name": "高渐离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/115/115.jpg" }, { "name": "扁鹊", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/119/119.jpg" }, { "name": "芈月", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/121/121.jpg" }, { "name": "周瑜", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/124/124.jpg" }, { "name": "甄姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/127/127.jpg" }, { "name": "武则天", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/136/136.jpg" }, { "name": "貂蝉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/141/141.jpg" }, { "name": "安琪拉", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/142/142.jpg" }, { "name": "姜子牙", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/148/148.jpg" }, { "name": "王昭君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/152/152.jpg" }, { "name": "张良", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/156/156.jpg" }, { "name": "不知火舞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/157/157.jpg" }, { "name": "钟馗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/175/175.jpg" }, { "name": "诸葛亮", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/190/190.jpg" }, { "name": "干将莫邪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/182/182.jpg" }, { "name": "女娲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/179/179.jpg" }, { "name": "杨玉环", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/176/176.jpg" }, { "name": "弈星", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/197/197.jpg" }, { "name": "米莱狄", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/504/504.jpg" }, { "name": "沈梦溪", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/312/312.jpg" }, { "name": "上官婉儿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/513/513.jpg" }, { "name": "嫦娥", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/515/515.jpg" }] }, { "name": "坦克", "heroes": [{ "name": "廉颇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/105/105.jpg" }, { "name": "刘禅", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/114/114.jpg" }, { "name": "白起", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/120/120.jpg" }, { "name": "夏侯惇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/126/126.jpg" }, { "name": "项羽", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/135/135.jpg" }, { "name": "程咬金", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/144/144.jpg" }, { "name": "刘邦", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/149/149.jpg" }, { "name": "牛魔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/168/168.jpg" }, { "name": "张飞", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/171/171.jpg" }, { "name": "东皇太一", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/187/187.jpg" }, { "name": "苏烈", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/194/194.jpg" }, { "name": "梦奇", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/198/198.jpg" }, { "name": "孙策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/510/510.jpg" }, { "name": "猪八戒", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/511/511.jpg" }] }, { "name": "刺客", "heroes": [{ "name": "阿轲", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/116/116.jpg" }, { "name": "李白", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/131/131.jpg" }, { "name": "韩信", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/150/150.jpg" }, { "name": "兰陵王", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/153/153.jpg" }, { "name": "娜可露露", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/162/162.jpg" }, { "name": "橘右京", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/163/163.jpg" }, { "name": "百里玄策", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/195/195.jpg" }, { "name": "裴擒虎", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/502/502.jpg" }, { "name": "元歌", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/125/125.jpg" }, { "name": "司马懿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/137/137.jpg" }, { "name": "云中君", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/506/506.jpg" }] }, { "name": "射手", "heroes": [{ "name": "孙尚香", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/111/111.jpg" }, { "name": "鲁班七号", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/112/112.jpg" }, { "name": "马可波罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/132/132.jpg" }, { "name": "狄仁杰", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/133/133.jpg" }, { "name": "后羿", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/169/169.jpg" }, { "name": "李元芳", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/173/173.jpg" }, { "name": "虞姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/174/174.jpg" }, { "name": "成吉思汗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/177/177.jpg" }, { "name": "黄忠", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/192/192.jpg" }, { "name": "百里守约", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/196/196.jpg" }, { "name": "公孙离", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/199/199.jpg" }, { "name": "伽罗", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/508/508.jpg" }] }, { "name": "辅助", "heroes": [{ "name": "庄周", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/113/113.jpg" }, { "name": "孙膑", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/118/118.jpg" }, { "name": "蔡文姬", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/184/184.jpg" }, { "name": "太乙真人", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/186/186.jpg" }, { "name": "大乔", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/191/191.jpg" }, { "name": "鬼谷子", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/189/189.jpg" }, { "name": "明世隐", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/501/501.jpg" }, { "name": "盾山", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/509/509.jpg" }, { "name": "瑶", "avatar": "https://game.gtimg.cn/images/yxzj/img201606/heroimg/505/505.jpg" }] }]
    //     for (let cat of rawData) {
    //         if (cat.name === '热门') {
    //             continue
    //         }
    //         // 找到当前分类在数据库中对应的数据
    //         const category = await Category.findOne({
    //             name: cat.name
    //         })
    //         cat.heroes = cat.heroes.map(hero => {
    //             hero.categories = [category]
    //             return hero
    //         })
    //         // 录入英雄
    //         await Hero.insertMany(cat.heroes)
    //     }

    //     res.send(await Hero.find())
    // })

    // // 英雄列表接口
    // router.get('/heroes/list', async (req, res) => {
    //     const parent = await Category.findOne({
    //         name: '英雄分类'
    //     })
    //     const cats = await Category.aggregate([
    //         { $match: { parent: parent._id } },
    //         {
    //             $lookup: {
    //                 from: 'heroes',
    //                 localField: '_id',
    //                 foreignField: 'categories',
    //                 as: 'heroList'
    //             }
    //         }
    //     ])
    //     const subCats = cats.map(v => v._id)
    //     cats.unshift({
    //         name: '热门',
    //         heroList: await Hero.find().where({
    //             categories: { $in: subCats }
    //         }).limit(10).lean()
    //     })

    //     res.send(cats)

    // });

    // // 文章详情
    // router.get('/articles/:id', async (req, res) => {
    //     const data = await Article.findById(req.params.id).lean()
    //     data.related = await Article.find().where({
    //         categories: { $in: data.categories }
    //     }).limit(2)
    //     res.send(data)
    // })

    // router.get('/heroes/:id', async (req, res) => {
    //     const data = await Hero
    //         .findById(req.params.id)
    //         .populate('categories items1 items2 partners.hero')
    //         .lean()
    //     res.send(data)
    // })


    app.use('/web/api', router)
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