var pools = {
  logo: '/img/logo.b00e9a89.png',
  domain: 'http://old.cook.surf', // 域名 
  pointApi: 'http://old.cook.surf/api', //节点地址  正式： http://cook.vin/api  测试：http://cook.tel/api 
  produceCoin: 'TDJmWtVu4VeoepMpsaDzPd1ZtnKC7EbBNf',//产出币地址^M
  decimals: 1e6,
  produceCoinImage: '/img/cook.png',
  pools: [{
      name: 'TRX~HJT-LP一>TKB',
      pledgeAddress: 'TTPVhk7M94ZS81YNtFfS2JNB8a7gtVFXQL', //质押币地址
      mine: 'TEmbQqmMZ3c4y1WKgkNbuCkfT8hnYDKMpC', //池子地址^M
      productDecimal: 1e18, // 产出币的精度
      mineImage: '/img/trx.jpg',
      pledgeName: 'TRX~HJT-LP', //质押币名称^M
      productName: 'TKB',
      decimals: 1e6,
      pledgeImage: '/img/hjb.png', // 质押币图标
      productImage: '/img/tbk.png', // 产出币的图片
      stock: 0, // 余量
      total: 0, //总量
      endTime: '2021/09/20 23:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
      startTime: '2021/08/21 23:00:00', // 开始时间
  }, {
      name: 'TRX~COOK-LP一>TKB',
      pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
      mine: 'TCM35R6buiY8wTfXDSWdXBaWRWipPfZuaT', //池子地址^M
      productDecimal: 1e18, // 产出币的精度
      mineImage: '/img/trx.jpg',
      pledgeName: 'TRX~COOK-LP', //质押币名称^M
      productName: 'TKB',
      decimals: 1e6,
      pledgeImage: '/img/cook.png', // 质押币图标
      productImage: '/img/tbk.png', // 产出币的图片
      stock: 0, // 余量
      total: 0, //总量
      startTime: '2021/08/11 21:00:00', // 开始时间
      endTime: '2021/08/31 21:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
  }, {
      name: 'TRX~HXB-LP一>TKB',
      pledgeAddress: 'TVG6vbBjPx71YXhYXxcqc9frsDKfk2i9i2', //质押币地址
      mine: 'TUEoreJkU28SbRz7dLBeWBYnwDXUJX3PFn', //池子地址^M
      productDecimal: 1e18, // 产出币的精度
      mineImage: '/img/trx.jpg',
      pledgeName: 'TRX~HXB-LP', //质押币名称^M
      productName: 'TKB',
      decimals: 1e6,
      pledgeImage: '/img/hxb.png', // 质押币图标
      productImage: '/img/tbk.png', // 产出币的图片
      stock: 0, // 余量
      total: 0, //总量
      startTime: '2021/08/11 22:00:00', // 开始时间
      endTime: '2021/09/10 22:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
  },
  {
    name: 'TRX~COOK-LP一>COOK',
    pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
    mine: 'TME7F8df1rVc2BkKcnUuSoQwvVPBs8TUg7', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX~COOK-LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/cook.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    startTime: '2021/09/2 23:59:59', // 开始时间
    endTime: '2021/09/4 23:59:59',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
  },
]
}

// 文字以及其他配置内容
var wordContent = {
  text1: ['库克协议是一个基于波场链搭建', '无需信任的、透明的和具有良好激励机制', '的财富管理市场协议'], // 首页第一行文字
  text3: '一个去中心化的流动性挖矿项目',// 首页第三行文字
  coinName: 'COOK', // 产出币的名称
  inviteAddres: 'TGmRnGtY6gf5enLpTaH9Z8HHv8M1p1ZUwM', // 默认的邀请地址
  dexUrl: "https://justswap.link/?lang=zh-CN&utm_source=tokenpocket#/home?tokenAddress=TDJmWtVu4VeoepMpsaDzPd1ZtnKC7EbBNf&type=swap"  // dex链接
}
