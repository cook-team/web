<template>
	<div class="home">
		<div style="padding: 0 15px;box-sizing:border-box">
			<p 
				v-for="(item,index) in text1" 
				:key="index" 
				v-html="item"
				style="color: #ffffff;text-align: center;font-family: Arial, Helvetica, sans-serif;font-size: 18px;font-weight: bold">
			</p>
			<p style="color: #FFFFFF;text-align: center;font-size: 16px;margin-top: 12px;">{{text3}}</p>

			<div class="indexbtnView">
				<div @click="goPool" class="indexBtn">
					开始挖矿
				</div>
				<div @click="toJustSwap" class="indexBtn">
					{{coinName}}交易
				</div>
			</div>

			<!-- <div style="background-color: #FFFFFF;padding: 15px;border-radius: 10px;margin-top: 30px;">
				<span style="color: rgb(50,77,86);font-size: 24px;">LP总量:</span>
				<span style="float: right;color: rgb(76,48,27);font-size: 26px;font-weight: bold;">{{lpTotal}}</span>
			</div> -->
			
			<div style="border-radius: 10px;overflow: hidden;margin-top: 30px;border: 1px solid #FFFFFF;box-shadow: 0px 0px 10px rgba(152, 152, 152, 0.2);">
				<div style="height: 70px;background-color: #FFFFFF;padding: 10px;display: flex;align-items: center;">
					<img style="height: 44px;display: inline-block;" src="../assets/car1.png" alt="">
					<div style="display: inline-block;margin-left: 10px;">
						<p style="font-size: 16px;font-weight:600">矿池余量</p>
						<p style="float: right;color: rgb(76,48,27);font-size: 26px;font-weight: bold;float: left;">
							{{(total - allStock).toFixed(4)}}
						</p>
					</div>
				</div>
				<div style="height: 40px;background-color:#F6B319;color: #FFFFFF;display: flex;justify-content: space-between;padding: 0 10px;align-items: center">
					<div>矿产总量</div>
					<div style="float: right;">{{total}}</div>
				</div>
			</div>

			<div style="border-radius: 10px;overflow: hidden;margin-top: 30px;border: 1px solid #FFFFFF;box-shadow: 0px 0px 10px rgba(152, 152, 152, 0.2);">
				<div style="height: 70px;background-color: #FFFFFF;padding: 10px;display: flex;align-items: center;">
					<img style="width:44px;height: 44px;display: inline-block;" src="../assets/balance2.png" alt="">
					<div style="display: inline-block;margin-left: 10px;">
						<p style="font-size: 16px;font-weight:600">我的余额</p>
						<p style="float: right;color: rgb(76,48,27);font-size: 26px;font-weight: bold;float: left;">
							{{balance}}
						</p>
					</div>
				</div>
				<div style="width: 100%; height: 60px;background-color: #F6B319;color: #FFFFFF;display: flex;">
					<div
						style="width: 50%;height: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
						
						<p style="font-size: 16px;font-weight: bold;">{{unfinishedIncome}}</p>
						<p style="font-size:14px">挖矿收益</p>
					</div>
					<div
						style="width: 50%;height: 100%;display: flex;flex-direction: column;justify-content: center;align-items: center;">
						
						<p style="font-size: 16px;font-weight: bold;">{{allRefReward}}</p>
						<p style="font-size:14px">推广奖励</p>
					</div>
				</div>
			</div>

			<div style="box-shadow: 0px 0px 10px rgba(152, 152, 152, 0.2);border-radius: 10px;margin-top: 30px;padding: 12px;overflow: hidden; border: 1px solid rgb(255, 255, 255);">
				<div style="padding-left:64px;" class="inviteTitle">
					<span style="font-size: 18px;color: rgb(50, 77, 86);font-weight:600">邀请好友</span><br>
					<span style="font-size: 12px;color: rgb(50, 77, 86);margin-top: -10px;">邀请好友挖矿可以获得超高的挖矿奖励</span>
				</div>
				<!-- 邀请链接 -->
        <div class="copy_view">
          <div class="copylinkView"  id="text">
            {{refLink1}}
          </div>
          <div
            ref="copy" 
            data-clipboard-action="copy"
            data-clipboard-target="#text"
            @click="copyLink"
            class="copyBtn"
          >
            复制链接
          </div>
        </div>
				
			</div>
		</div>
		
		<van-overlay :show="showLoading">
			<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<div style="width: 240px;height: 130px;background: #FFFFFF;display: flex;justify-content: center;align-items: center;flex-direction: column;border-radius: 10px;">
					<van-loading type="circular" color="#BF211A" />
					<span style="color: #333;font-weight:bold;margin-top:6;margin-bottom:17px;font-size:16px">数据链接中……</span>
					<span style="color: #333;font-size:14px">请在钱包中切换波场链打开……</span>
				</div>
				
			</div>
		</van-overlay>
	</div>
</template>

<script>
	// import pools from '../config/pools.js'
	import TronWeb from 'tronweb'
	export default {
		name: 'Home',
		data() {
			return {
				copyBtn: null,
				balance: 0,
				parent: '',
				refLink1: '',
				unfinishedIncome: 0,
				allRefReward: 0,
				allStock: 0,
				rewardRates: [],
				starttimes: [],
				total: 0,
				showLoading: false,
				lpTotal: 0,
				text1: wordContent.text1,
				text2: wordContent.text2,
				text3: wordContent.text3,
				coinName: wordContent.coinName
			}
		},
		components: {},
		async mounted() {
			window.changeBgcolor && window.changeBgcolor(true) // 修改背景
			window.changeHeader && window.changeHeader(true); // 显示header
			this.showLoading = true//紧急注释
			this.parent = this.$route.query.ref;
			this.copyBtn = new this.clipboard(this.$refs.copy);
			var timer = setInterval(async () => { //紧急注释
				if (typeof tronWeb !== 'undefined') {
					if (tronWeb.isAddress(this.parent)) {
						localStorage.setItem("parent", this.parent);
					} else {
						localStorage.setItem("parent", wordContent.inviteAddres);
					}
					// tronWeb.setHeader({"TRON-PRO-API-KEY": '0d54d84d-70f6-49b5-bd0c-83a286592f88'});
					this.tronWeb = new TronWeb({
						// fullHost: 'http://210.56.55.28:41752/wallet/getnowblock', // 另外一个地址
						// fullHost: pools.pointApi, // 正式环境
						fullHost: 'https://api.trongrid.io', //测试环境
						headers: { "TRON-PRO-API-KEY": 'd0ca3dfb-5123-4f1d-bf45-22f949388042' },//测试环境
					})
					this.tronWeb.setAddress(tronWeb.defaultAddress.base58);
					
					clearInterval(timer)//紧急注释
					// 生成合约
					let coinContract = await this.tronWeb.contract().at(pools.produceCoin);
					this.balance = await coinContract.balanceOf(tronWeb.defaultAddress.base58).call()
					this.balance = parseFloat(this.balance / pools.decimals).toFixed(5)
					this.balance = this.balance.substring(0,this.balance.lastIndexOf('.')+5)
					this.refLink1 = `${pools.domain}`
					this.getData();
					await this.getStock();
					this.showLoading = false
					this.setStock();
				}
			}, 100)//紧急注释
		},
		methods: {
			// 跳转pools
			goPool() {
				window.changeBgcolor(true,2)
				this.$router.push('/pools');
			},
			toJustSwap() {
				window.location.href = wordContent.dexUrl;
			},
			copyLink() {
				let _this = this;
				let clipboard = _this.copyBtn;
				clipboard.on('success', function() {
					alert("成功");
					_this.copyBtn.destroy(); // 销毁
					_this.copyBtn = new _this.clipboard(_this.$refs.copy); // 重新绑定
				});
				clipboard.on('error', function() {
					alert("失败");
					_this.copyBtn.destroy(); // 销毁
					_this.copyBtn = new _this.clipboard(_this.$refs.copy); // 重新绑定
				});
			},
			async getStock() {
				for (let i = 0; i < pools.pools.length; i++) {
					let contract = await this.tronWeb.contract().at(pools.pools[i].mine);
					this.rewardRates.push(contract.rewardRate().call());
					this.starttimes.push(contract.startTime().call());
					// pools.pools[i].stock = await contract.periodFinish().call()
				}
			},
			setStock() {
				var _this = this;
				
				Promise.all(_this.rewardRates.concat(_this.starttimes)).then(function(values) {
					// var that = _this;
					var currentTime = Math.round(new Date() / 1000);
					_this.allStock = 0;
					for (let i = 0; i < values.length / 2; i++) {
						let stock = (parseFloat(((currentTime - values[values.length / 2 + i]) * values[i]) / pools.pools[i].productDecimal) * 1.1).toFixed(4);
						// console.log(currentTime,parseInt(values[values.length / 2 + i]),parseInt(values[i]))
						// console.log(stock)
						if(pools.pools[i].name == 'TRX-TKB LP矿池') {
								console.log('查看stock@@@@@')
								console.log(stock)
							}
						if(parseFloat(stock) < 0) {
							pools.pools[i].stock = 0;
						} else if(parseFloat(stock) > parseFloat(pools.pools[i].total)){
							// console.log(stock,pools.pools[i].total)
							pools.pools[i].stock = pools.pools[i].total;
						} else {
							pools.pools[i].stock = stock;
						}
						// console.log(pools.pools[i].total)
						_this.allStock = (parseFloat(_this.allStock) + parseFloat(pools.pools[i].stock)).toFixed(4)
					}
				});
				
				setInterval(function() {
					Promise.all(_this.rewardRates.concat(_this.starttimes)).then(function(values) {
						// var that = _this;
						var currentTime = Math.round(new Date() / 1000);
						_this.allStock = 0;
						for (let i = 0; i < values.length / 2; i++) {
							let stock = (parseFloat(((currentTime - values[values.length / 2 + i]) * values[i]) / pools.pools[i].productDecimal) * 1.1).toFixed(4);
							
							if(parseFloat(stock) < 0) {
								pools.pools[i].stock = 0;
							} else if(parseFloat(stock) > parseFloat(pools.pools[i].total)){
								// console.log(stock,pools.pools[i].total)
								pools.pools[i].stock = pools.pools[i].total;
							} else {
								pools.pools[i].stock = stock;
							}
							_this.allStock = (parseFloat(_this.allStock) + parseFloat(pools.pools[i].stock)).toFixed(4)
						}
					});
				},1000)
			},
			async getData() {
				let contracts = [];
				for (let i = 0; i < pools.pools.length; i++) {
					contracts.push(await this.tronWeb.contract().at(pools.pools[i].mine));
				}
				let unfinishedIncomePromises = [];
				let allRefRewardPromises = [];
				let totalsPromises = [];
				for (let i = 0; i < contracts.length; i++) {
					unfinishedIncomePromises.push(contracts[i].earned(tronWeb.defaultAddress.base58).call());
					allRefRewardPromises.push(contracts[i].getReferralRewards(tronWeb.defaultAddress.base58).call())
					totalsPromises.push(contracts[i].poolInfo().call())
				}
				var _this = this
				Promise.all(unfinishedIncomePromises).then(function(values) {
					var that = _this;
					values.forEach((v,i) => {
						that.unfinishedIncome = that.unfinishedIncome + ( parseInt(v) / pools.pools[i].productDecimal)
					})
					that.unfinishedIncome = parseFloat(that.unfinishedIncome).toFixed(4)
				});
				
				Promise.all(allRefRewardPromises).then(function(values) {
					var that = _this;
					values.forEach((v,i)=> {
						that.allRefReward = that.allRefReward + ( parseInt(v) / pools.pools[i].productDecimal)
					})
					that.allRefReward = parseFloat(that.allRefReward).toFixed(4)
				});
				
				Promise.all(totalsPromises).then(function(values) {
					var that = _this;
					// values.forEach(v => {
					// 	that.total = that.total + parseInt(v.totalReward)
					// })
					for (let i = 0; i < values.length; i++) {
						that.total = that.total +  (parseInt(values[i].totalReward) / pools.pools[i].productDecimal) ;
						pools.pools[i].total = parseFloat(values[i].totalReward / pools.pools[i].productDecimal).toFixed(4);
					}
					that.total = parseFloat(that.total).toFixed(4)
				});
				
			}
		}
	}
</script>

<style scoped>
	* {
		margin: 0;
		padding: 0;
	}

	.home {
		width: 100%;
		padding-bottom: 50px;
	}
	.indexbtnView {
		margin-top: 30px;
		display: flex;
		justify-content: space-between;
	}
	.indexBtn {
		line-height: 50px;
		font-weight: bold;
		height: 50px;
		width: 45%;
		text-align: center;
		border-radius: 12px;
		background: #fff;
		color: #CE3428;
		display: inline-block;
		font-size: 18px;
	}
	.inviteTitle {
		background:url('../assets/invite.png') no-repeat left center / 44px 44px
	}
	.copyBtn {
		width: 56px;
		height: 34px;
		color: #CE3428;
		font-size: 14px;
		line-height: 34px;
		text-align: center;
	}
  .copy_view {
    border-radius: 1px;
		height:34px;
		line-height:34px;
		border: 1px solid #ccc;
    margin-top: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    box-sizing: border-box;
  }
	.copylinkView {
		overflow: hidden;
		white-space: normal;
		word-break: break-all;
		font-size: 14px;
    color: #333;
	}
	.copylinkView_hide {
		position: absolute;
		left: 0;
		top: 0;
		opacity: 0;
	}
</style>
