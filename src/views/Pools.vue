<template>
	<div class="pools">
		
		<div style="display: flex;flex-wrap: wrap;width: 100%;">
			<div 
				v-for="(pool,index) in pools" 
				:key="index"
				class="pool_card"
			>
				<div class="poolItemNumView"><p class="poolItemNum">{{index + 1}}号矿池{{`【产${pool.productName||''}】`}}</p></div>
				<div style="height:30px;"></div>
				<div style="display:flex;justify-content: center;align-items: center;margin-bottom:18px">
					<img :src="pool.pledgeImage" style="width:74px;height:74px;border-radius:54px;overflow:hidden;flex-shrink:0"  alt=""/>
					<div class="poolItemInfo">
						<!-- <p style="font-size: 18px;font-weight: bold;margin-bottom:13px">{{pool.name}}</p> -->
						<div style="display:flex;align-items:center;margin-bottom:13px">
							<p style="font-size: 18px;font-weight: bold;line-height: 24px">{{pool.pledgeName}}矿池</p>
							<!-- <img src="../assets/right.png" style="width:20px;height:10px;margin: 0 9px"/>
							<p style="font-size: 18px;font-weight: bold;line-height: 24px">{{pool.productName}}</p> -->
						</div>
						<p style="font-size:14px;color:#BF211A">
							每日产量
							<span style="font-size:16px;font-weight:bold;color:#BF211A;padding-left:5px">{{getDayValue(pool)}}</span>
						</p>
					</div>
				</div>
				<!-- <div v-if="pool.intro">
					<p class="longTxt">{{pool.intro}}</p>
				</div> -->
				
				<div @click="goDetail(pool,index)" class="poollistBtn">
					进入矿池
				</div>
				<div class="poolNumView">
					<div style="font-size: 16px;text-align: center;">矿池存量:</div>
					<h4 style="text-align: center;font-size:28px;font-weight:bold;line-height: 37px;">{{showendTime(pool)==3?0:(pool.total - pool.stock).toFixed(4)}}</h4>
				</div>
				<!-- <div style="text-align: center;font-size: 16px;color: red;margin-top: 5px;font-weight: bold;">{{pool.total - pool.stock == pool.total ? "未开始" : pool.total - pool.stock == 0 ? "已结束" : "出矿中"}}</div> -->
				<div class="poolStatusView">
					<p v-if="showendTime(pool)==1">挖矿还没有开始</p>
					<div v-if="showendTime(pool)==2" class="cutdownView">
						<span>正在产矿中：</span>
						<cutDown :time="pool.endTime" @onEnd="endFnc" :poolIndex="index"/>
						<span>之后挖完</span>
					</div>
					<p v-if="showendTime(pool)==3">挖矿已经结束了</p>
				</div>
				<!-- <div class="whitebg" v-if="showendTime(pool)==3">
					<div 
						style="margin-top:126px;width:100%;height:50px;"
						@click="goDetail(pool,index)"
					></div>
				</div> -->
			</div>
		</div>
		<div style="height: 50px;"></div>
	</div>
</template>

<script>
	// import pools from '../config/pools.js'
	import cutDown from './cutDown';
	export default {
		name: 'Pools',
		components: {
			cutDown
		},
		data() {
			const data =  pools.pools.map(item=>{
				return {...item,status: this.showendTime(item)}
			})
			return {
				pools: pools.pools,
				// contracts: [],
				// rewardRates: [],
				// starttimes: [],
				statusInfo: '正在出矿',
			}
		},
		methods: {
			// async getStock() {
			// 	for (let i = 0; i < pools.pools.length; i++) {
			// 		let contract = await tronWeb.contract().at(pools.pools[i].mine);
			// 		this.rewardRates.push(contract.rewardRate().call());
			// 		this.starttimes.push(contract.starttime().call());
			// 		// pools.pools[i].stock = await contract.periodFinish().call()
			// 	}
			// },
			// setStock() {
			// 	var _this = this;
			// 	setInterval(function() {
			// 		Promise.all(_this.rewardRates.concat(_this.starttimes)).then(function(values) {
			// 			// var that = _this;
			// 			var currentTime = Math.round(new Date() / 1000);
			// 			for (let i = 0; i < values.length / 2; i++) {
			// 				pools.pools[i].stock = (parseFloat(((currentTime - values[values.length / 2 + i]) * values[i]) / 1e18) * 1.1).toFixed(3);
			// 				// console.log(currentTime - values[values.length / 2 + i])
			// 			}
			// 		});
			// 	},500)
			// }
			// 计算每日产量
			getDayValue(item) {
				const time = new Date(item.endTime).getTime() - new Date(item.startTime).getTime();
				const day = time / 24 / 60 / 60 / 1000;
				return (item.total / day).toFixed(4)
			},
			endFnc(index) {
				this.pools[index].status = 3;
			},
			goDetail(pool,index) {
				const data =this.showendTime(pool);
				if(data==1) {
					alert('挖矿未开始!')
					return 
				}
				// if(data==3) {
				// 	alert('挖矿已结束!')
				// 	return 
				// }
				this.$router.push('/pool/'+index);
			},
			// 显示矿池的状态
			showendTime(pool) {
				const { startTime,endTime } = pool;
				var status = '1'; // 默认 未开始状态
				const now = new Date().getTime() * 1;
				const end = new Date(endTime).getTime() *1;
				const start = new Date(startTime).getTime() *1;
				if(now < start) {
					status = '1';
				}
				if(start < now && now < end) {
					status = '2';
					
				}
				if(now > end) {
					status = '3';
				}
				return status;
				
			}
		},
		async mounted() {
			window.changeBgcolor && window.changeBgcolor(true,2) // 修改背景
			window.changeHeader && window.changeHeader(true); // 显示header
			// var timer = setInterval(async () => {
			// 	if (typeof tronWeb !== 'undefined') {
			// 		// tronWeb.setHeader({"TRON-PRO-API-KEY": '0d54d84d-70f6-49b5-bd0c-83a286592f88'});
			// 		clearInterval(timer)
			
			// 		// await this.getStock();
			// 		// this.setStock();
			// 	}
			// }, 1000)
		},
		
	}
</script>

<style scoped="">
	.pools{
		padding: 0 15px;
		box-sizing: border-box;
		/* background-color: rgb(50, 77, 86); */
	}

	
	.pool_card{
		width: 100%;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin: 0 auto;
		margin-top: 30px;
		padding: 20px 0;
		padding-left: 22px;
		padding-right: 23px;
		box-shadow: 0px 0px 10px rgba(152, 152, 152, 0.2);
		position: relative;
	}
	.whitebg {
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background: rgba(255, 255, 255, 0.3);
	}
	.poollistBtn {
		width: 100%;
		height: 50px;
		background: #BF211A;
		box-shadow: 0px 0px 5px rgba(213, 213, 213, 0.5);
		line-height: 50px;
		text-align: center;
		font-size: 16px;
		color: #fff;
		border-radius: 5px;
	}
	.poolNumView {
		margin-top: 20px;
		background: #FFF1F1;
		width: 100%;
		min-height: 76px;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		border-radius: 10px;
	}
	.poolStatusView p{
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		line-height: 19px;
		color: #333333;
		margin-top: 15px;
		text-align: center;
	}
	.cutdownView {
		margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
	}
	.poolItemNumView {
		width: 100%;
		height: 35px;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
	}
	.poolItemNum {
		min-width: 200px;
		height: 35px;
		background: #FFF1F1;
		opacity: 1;
		border-radius: 0px 0px 10px 10px;
		line-height: 35px;
		text-align: center;
		font-size: 18px;
		font-weight: bold;
		color: #BF211A
	}
	.poolItemInfo {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 10px;
		flex: 1;
	}
	.shortTxt {
		font-size: 14px;
		color: #333333;
		line-height: 19px;
		text-overflow: -o-ellipsis-lastline;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	.longTxt {
		font-size: 14px;
		color: #333333;
		line-height: 19px;
		margin-bottom: 25px
	}
	.poolItemArrow {
		display:block;
		width:24px;
		height:24px;
		margin:0 auto;
		margin-top:5px;
		margin-bottom:25px
	}
</style>
