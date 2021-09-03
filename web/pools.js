var pools = {
  logo: '/img/logo.b00e9a89.png',
  domain: 'http://old.cook.surf', // 域名
  produceCoin: 'TDJmWtVu4VeoepMpsaDzPd1ZtnKC7EbBNf',//产出币地址^M
  decimals: 1e6,
  produceCoinImage: '/img/cook.png',
  pools: [{
    name: 'TRX-HJT LP一>TKB',
    pledgeAddress: 'TTPVhk7M94ZS81YNtFfS2JNB8a7gtVFXQL', //质押币地址
    mine: 'TEmbQqmMZ3c4y1WKgkNbuCkfT8hnYDKMpC', //池子地址^M
    productDecimal: 1e18, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-HJT LP', //质押币名称^M
    productName: 'TKB',
    decimals: 1e6,
    pledgeImage: '/img/hjb.png', // 质押币图标
    productImage: '/img/tbk.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/09/20 23:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/08/21 23:00:00', // 开始时间
  }, {
    name: 'TRX-COOK LP一>TKB',
    pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
    mine: 'TCM35R6buiY8wTfXDSWdXBaWRWipPfZuaT', //池子地址^M
    productDecimal: 1e18, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-COOK LP', //质押币名称^M
    productName: 'TKB',
    decimals: 1e6,
    pledgeImage: '/img/cook.png', // 质押币图标
    productImage: '/img/tbk.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    startTime: '2021/08/11 21:00:00', // 开始时间
    endTime: '2021/08/31 21:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
  }, {
    name: 'TRX-HXB LP一>TKB',
    pledgeAddress: 'TVG6vbBjPx71YXhYXxcqc9frsDKfk2i9i2', //质押币地址
    mine: 'TUEoreJkU28SbRz7dLBeWBYnwDXUJX3PFn', //池子地址^M
    productDecimal: 1e18, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-HXB LP', //质押币名称^M
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
    name: '临时池子，勿质押',
    pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
    mine: 'TRaEMVKH922mswHoQz1DwPj2zoKtnBfWFN', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: '临时池子，勿质押', //质押币名称^M
    productName: '',
    decimals: 1e6,
    pledgeImage: '/img/cook.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    startTime: '2021/08/18 21:00:00', // 开始时间
    endTime: '2021/08/20 21:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    showIntro: false, // 是否全部展示介绍文字
    intro: '临时池子，勿质押' //矿池介绍文字
  }
    , {
    name: 'TRX-COOK LP一>COOK',
    pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
    mine: 'TSsjq5uX8Wriz4Yvvzm8cb4Kfq5F46Jvhs', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-COOK LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/cook.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/08/17 22:59:12',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/07/18 21:00:00', // 开始时间
  }, {
    name: 'TRX-TKB LP一>COOK',
    pledgeAddress: 'TYaPyCw45RTzaP7xGeqJh3uJPyGggQ4TB1', //质押币地址
    mine: 'THAj4rVHGsToL31ZaSaZwodi4EWcpA4hYq', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-TKB LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/tbk.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/08/17 21:30:00',  // 距离结束 年月日,请使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/07/18 21:30:00', // 开始时间
  }, {
    name: 'TRX-HXB LP-->COOK',
    pledgeAddress: 'TVG6vbBjPx71YXhYXxcqc9frsDKfk2i9i2', //质押币地址
    mine: 'TYEJZ7jG1W6NGLrvGZ7HmfyMdoHGZEqtwc', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-HXB LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/hxb.png', // 质押币图标
    productImage: '/img/tbk.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/08/10 12:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/07/21 12:00:00', // 开始时间

  }, {
    name: 'TRX-DF518 LP一>COOK',
    pledgeAddress: 'TATK7ApFEi8tkLuAMq8YGm8mSxWzFWRWdF', //质押币地址
    mine: 'TFqhDudaDUmeZKHZpiG6o4Wi2GzPyKK7ZJ', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-DF518 LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/DF518.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/08/10 12:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/07/21 12:00:00', // 开始时间
  }, {
    name: 'TRX-HJT LP一>COOK',
    pledgeAddress: 'TTPVhk7M94ZS81YNtFfS2JNB8a7gtVFXQL', //质押币地址
    mine: 'TCUxekMMiUMhNs89GL8aF1VgkssCrzLv11', //池子地址^M
    productDecimal: 1e6, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-HJT LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/hjb.png', // 质押币图标
    productImage: '/img/cook.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    endTime: '2021/08/10 12:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    startTime: '2021/07/21 12:00:00', // 开始时间
    showIntro: false, // 是否全部展示介绍文字
    intro: '矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字矿池介绍文字' //矿池介绍文字
  },
  {
    name: '临时池子，勿质押',
    pledgeAddress: 'TDMdfhfrhcpBR5yHAi87NFLw3az4jgqsMU', //质押币地址
    mine: 'TNbd8apJyTk2pW7uk99XpE2QQmiDxwZRhT', //池子地址^M
    productDecimal: 1e18, // 产出币的精度
    mineImage: '/img/trx.jpg',
    pledgeName: 'TRX-HKB LP', //质押币名称^M
    productName: 'COOK',
    decimals: 1e6,
    pledgeImage: '/img/cook.png', // 质押币图标
    productImage: '/img/hkb.png', // 产出币的图片
    stock: 0, // 余量
    total: 0, //总量
    startTime: '2021/08/29 22:00:00', // 开始时间
    endTime: '2021/08/09 22:00:00',  // 距离结束 年月日请尽量使用 '/'来隔开（2021/07/28），不然有可能ios端会无法解析格式
    showIntro: false, // 是否全部展示介绍文字
    intro: '' //矿池介绍文字
  }
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