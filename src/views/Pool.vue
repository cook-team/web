<template>
	<div class="pool" style="padding:0 15px;box-sizing:border-box">
		<!-- <div style="color: #FFFFFF;text-align: center;">
			<img style="width: 120px;height: 120px;" :src="pools.pools[this.$route.params.index].mineImage" alt="">
			<h2>{{poolName}}</h2>
			<p style="font-size: 12px;">质押{{pledgeName}}并赚取</p>
		</div> -->
		<div class="detailHeader">
			<div class="backBtn" @click="backPage"></div>
			<p>{{poolName}}</p>
		</div>
		<div style="display: flex;flex-wrap: wrap;width: 100%;margin: 30px auto;justify-content: center;">
			<div class="pool_card">
				<img style="width: 50px;height: 50px;display: block;margin: 0 auto;margin-top: 20px;" :src="pools.pools[this.$route.params.index].productImage">
				<p style="font-size:14px;color:#333;margin-top:14px">{{pledgeName}}挖矿收益</p>
				<h2 style="margin-top: 10px;">{{earned}}</h2>
				<!-- <p style="font-size: 12px;">待收获Orange</p> -->
				<div :class="earned == 0 ? 'disable_btn' : 'enable_btn'" @click="exit"
					style="color: #FFFFFF;line-height: 50px;font-weight: bold;height: 50px;width: 90%;text-align: center;border-radius: 5px;box-shadow: rgba(213, 213, 213, 0.5) 0px 0px 8px;margin: 0 auto;margin-top: 20px;margin-bottom:30px;cursor: pointer;">
					提现
				</div>
				<!-- background-image: linear-gradient(to bottom right, #96C38E, #58B74D); -->
				<!-- background-color: #CCC; -->
			</div>
			<div class="pool_card">
				<img style="width: 50px;height: 50px;display: block;margin: 0 auto;margin-top: 20px;" :src="pools.pools[this.$route.params.index].productImage">
				<p style="font-size:14px;color:#333;margin-top:14px">{{pledgeName}}推广收益</p>
				<h2 style="margin-top: 10px;">{{refReward}}</h2>
				<!-- <p style="font-size: 12px;">待收获推荐奖励</p> -->
				<div :class="refReward == 0 ? 'disable_btn' : 'enable_btn'" @click="showRefWithdrawCard"
					style="color: #FFFFFF;line-height: 50px;font-weight: bold;height: 50px;width: 90%;text-align: center;border-radius: 5px;box-shadow: rgba(213, 213, 213, 0.5) 0px 0px 8px;margin: 0 auto;margin-top: 20px;margin-bottom:30px;cursor: pointer;">
					提现
				</div>
				<!-- background-image: linear-gradient(to bottom right, #96C38E, #58B74D); -->
				<!-- background-color: #CCC; -->
			</div>
			<div class="pool_card">
				<img style="width: 50px;height: 50px;display: block;margin: 0 auto;margin-top: 20px;" :src="pools.pools[this.$route.params.index].pledgeImage">
				<p style="font-size:14px;color:#333;margin-top:14px">{{pledgeName}}已质押</p>
				<h2 style="margin-top: 10px;">{{alreadyBalance}}</h2>
				<!-- <p style="font-size: 12px;">{{pledgeName}}已质押</p> -->
				<div v-show="!isApprove" @click="approve"
					style="background:#BF211A;color: #FFFFFF;line-height: 50px;font-weight: bold;height: 50px;width: 90%;text-align: center;border-radius: 5px;box-shadow: rgba(213, 213, 213, 0.5) 0px 0px 8px;margin: 0 auto;margin-top: 20px;margin-bottom:30px;cursor: pointer;">
					开启挖矿
				</div>
				<!-- <button v-show="!isApprove" @click="approve">授权</button> -->
				<div style="display: flex; justify-content:center;margin-top:19px" v-show="isApprove">
					<!-- <button @click="deposit">质押</button> -->
					<!-- <div @click="showDeposit = true"
						style="color: #FFFFFF;font-size:15px;height:40px;line-height:40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						质押
					</div> -->
					<!-- <button @click="withdraw">解压</button> -->
					<!-- <div @click="showWithdraw = true"
						style="color: #FFFFFF;font-size:15px;height:40px;line-height:40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						解押
					</div> -->
					<div class="cancelBtn" v-show="(isNaN(alreadyBalance * 1)?false:(alreadyBalance * 1))" @click="showWithdraw = true">取消质押</div>
					<div class="zhiyaBtn" v-show="(isNaN(alreadyBalance * 1)?false:(alreadyBalance * 1))" @click="showDepositdialog">+</div>

					<div class="cancelBtn" style="margin-right:0" v-show="!(isNaN(alreadyBalance * 1)?false:(alreadyBalance * 1))" @click="showDepositdialog">质押</div>
				</div>
			</div>
		</div>
    <!-- 质押弹窗 -->
		<van-overlay :show="showDeposit" @click="showDeposit = false">
			<div style="width: 94%;height: 180px;background-color: #FFFFFF;position: fixed;bottom: 0;border-radius: 10px 10px 0px 0px;box-shadow: #CCC 0px 0px 8px;padding: 3%;"
				@click.stop>
				<h3 style="color: rgb(50,77,86);text-align: center;">质押{{pledgeName}}</h3>
				<p style="text-align: right;color: rgb(50,77,86);font-size: 14px;margin-top: 10px;">{{balance}}
					{{pledgeName}}可用</p>
				<van-field v-model="depostAmount" type="number" placeholder="请输入质押数量" style="margin-top: 10px;" />
				<div style="display: flex;">
					<div @click="showDeposit = false"
						style="color: #FFFFFF;font-size:15px;line-height: 40px;font-weight: 400;height: 40px;width: 40%;text-align: center;border-radius:5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						取消
					</div>
					<div @click="deposit()"
						style="color: #FFFFFF;font-size:15px;line-height: 40px;font-weight: 400;height: 40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						确定
					</div>
				</div>
			</div>
		</van-overlay>
    <!-- 邀请码弹窗 -->
    <van-overlay :show="showInvite" @click="showInvite = false">
			<div style="width: 94%;height: 180px;background-color: #FFFFFF;position: fixed;bottom: 0;border-radius: 10px 10px 0px 0px;box-shadow: #CCC 0px 0px 8px;padding: 3%;"
				@click.stop>
				<h3 style="color: rgb(50,77,86);text-align: center;margin-bottom:40px">邀请码填写</h3>
				<van-field v-model="inviteCode" placeholder="请填写好友的邀请码" style="margin-top: 10px;" />
				<div style="display: flex;">
					<div @click="showInvite = false"
						style="color: #FFFFFF;font-size:15px;line-height: 40px;font-weight: 400;height: 40px;width: 40%;text-align: center;border-radius:5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						取消
					</div>
					<div @click="sureInvite()"
						style="color: #FFFFFF;font-size:15px;line-height: 40px;font-weight: 400;height: 40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						确定
					</div>
				</div>
			</div>
		</van-overlay>
    <!-- 体现弹窗 -->
		<van-overlay :show="showWithdraw" @click="showWithdraw = false">
			<div style="width: 94%;height: 180px;background-color: #FFFFFF;position: fixed;bottom: 0;border-radius: 10px 10px 0px 0px;box-shadow: #CCC 0px 0px 8px;padding: 3%;"
				@click.stop>
				<h3 style="color: rgb(50,77,86);text-align: center;">解押{{pledgeName}}</h3>
				<p style="text-align: right;color: rgb(50,77,86);font-size: 14px;margin-top: 10px;">{{alreadyBalance}}
					{{pledgeName}}可解押</p>
				<van-field v-model="withdrawAmount" type="number" placeholder="请输入解押数量" style="margin-top: 10px;" />
				<div style="display: flex;">
					<!-- <button @click="deposit">质押</button> -->
					<div @click="showWithdraw = false"
						style="color: #FFFFFF;font-size:15px;height:40px;line-height:40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						取消
					</div>
					<!-- <button @click="withdraw">解压</button> -->
					<div @click="withdraw()"
						style="color: #FFFFFF;font-size:15px;height:40px;line-height:40px;width: 40%;text-align: center;border-radius: 5px;background: #BF211A;margin: 0 auto;margin-top: 20px;cursor: pointer;">
						解押
					</div>
				</div>
			</div>
		</van-overlay>
		<van-overlay :show="showLoading">
			<div style="width: 100%;height: 100%;display: flex;justify-content: center;align-items: center;flex-direction: column;">
				<div style="width: 180px;height: 130px;background: #FFFFFF;display: flex;justify-content: center;align-items: center;flex-direction: column;border-radius: 10px;">
					<span style="color: #333;font-size:16px;font-weight:bold;margin-bottom:15px">确认中...</span>
					<van-loading type="circular" color="#BF211A" />
					<span style="color: #999;font-size:14;margin-top:10px">请稍后...</span>
				</div>
			</div>
		</van-overlay>
	</div>
</template>

<script>
	// import pools from '../config/pools.js'
	import TronWeb from 'tronweb'
	export default {
		name: 'Pool',
		data() {
			return {
				poolName: '',
				pledgeName: '',
				contractAddress: '',
				pledgeAddress: '',
				contract: null,
				trc20: null,
				autoContract: null,
				autoTrc20: null,
				earned: 0,
				address: '',
				isApprove: false,
				balance: 0,
				alreadyBalance: 0,
				showDeposit: false,
				showWithdraw: false,
				showRefWithdraw: false,
				depostAmount: '',
				withdrawAmount: '',
				refWithdrawAmount: '',
				showLoading: false,
				refReward: 0,
				timer: null,
				pools: pools,
        // 邀请
        showInvite: false,
        inviteCode: ''
			}
		},
		methods: {
      // 邀请链接绑定
      sureInvite() {
        if(this.inviteCode) {
          this.showInvite = false;
          this.showDeposit = true;
        }
      },
			// 显示质押的输入的弹窗
			showDepositdialog() {
				const data =  this.balance; // 因为测试 暂时注释了
				const res = data * 1;
				console.log(res)
				if(isNaN(res) || !res) {
          alert('余额不足！')
					return
				}
        if(!this.inviteCode) {
          this.showInvite = true;
          return
        }
				this.showDeposit = true
			},
			backPage() {
				this.$router.go(-1)
			},
			async getData() {
				console.log('第一行getdata函数')
				// this.balance = await this.trc20.balanceOf(this.address).call();
				let balanceRes = await tronWeb.transactionBuilder.triggerConstantContract(this.pledgeAddress,"balanceOf(address)", {},[{type:'address',value:this.address}],this.address);
				console.log('balanceRes')
				let res = balanceRes.constant_result[0]
				this.balance = await this.decodeParams(['uint256'],"0x"+res, true)
				this.balance = parseFloat(this.balance / pools.pools[this.$route.params.index].decimals).toFixed(15);
				this.balance = this.balance.substring(0,this.balance.lastIndexOf('.')+5)

				this.refReward = await this.contract.getReferralRewards(this.address).call();
				this.refReward = parseFloat(this.refReward / pools.pools[this.$route.params.index].productDecimal).toFixed(15);
				this.refReward = this.refReward.substring(0,this.refReward.lastIndexOf('.')+5)

				let periodFinish = await this.contract.periodFinish().call();

				let allowanceRes = await tronWeb.transactionBuilder.triggerConstantContract(this.pledgeAddress,"allowance(address,address)", {},[{type:'address',value:this.address},{type:'address',value:this.contractAddress}],this.address);
				res = allowanceRes.constant_result[0]
				let allowance = await this.decodeParams(['uint256'],"0x"+res, true)
				// console.log(allowance)
				// let allowance = await this.trc20.allowance(this.address, this.contractAddress).call();
				if (allowance > 0) {
					this.isApprove = true;
				}
			},

			async getEarned() {
				this.earned = await this.contract.earned(this.address).call();
				this.earned = parseFloat(this.earned / pools.pools[this.$route.params.index].productDecimal).toFixed(15);
        this.earned = this.earned.substring(0,this.earned.lastIndexOf('.')+5)

				this.alreadyBalance = await this.contract.balanceOf(this.address).call();
				this.alreadyBalance = parseFloat(this.alreadyBalance / pools.pools[this.$route.params.index].decimals).toFixed(15);
				this.alreadyBalance = this.alreadyBalance.substring(0,this.alreadyBalance.lastIndexOf('.')+5)
			
				this.timer = setInterval(async () => {
					if(this.$route.params.index) { // 路由没有传参就不请求
						this.earned = await this.contract.earned(this.address).call();
						this.earned = parseFloat(this.earned / pools.pools[this.$route.params.index].productDecimal).toFixed(15);
            this.earned = this.earned.substring(0,this.earned.lastIndexOf('.')+5)

						this.alreadyBalance = await this.contract.balanceOf(this.address).call();
						this.alreadyBalance = parseFloat(this.alreadyBalance / pools.pools[this.$route.params.index].decimals).toFixed(15);
						this.alreadyBalance = this.alreadyBalance.substring(0,this.alreadyBalance.lastIndexOf('.')+5)
						// this.refReward = await this.contract.getReferralRewards(this.address).call();
						// this.refReward = parseFloat(this.refReward / pools.pools[this.$route.params.index].productDecimal).toFixed(3);
					} else {
						console.log('clear')
						clearInterval(this.timer)
					}
				}, 2000)
			},
			async approve() {
				try {
					// this.autoTrc20 = await tronWeb.contract().at(this.pledgeAddress);
					// await this.autoTrc20.approve(this.contractAddress, '100000000000000000000000000').send();
					let transaction = await tronWeb.transactionBuilder.triggerSmartContract(this.pledgeAddress, "approve(address,uint256)", {}, [{type:'address',value:this.contractAddress},{type:'uint256',value:'100000000000000000000000000'}], this.address);
					let signTransaction = await tronWeb.trx.sign(transaction.transaction)
					// console.log(JSON.stringify(signTransaction))
					// 广播
					fetch("/api/wallet/broadcasttransaction", {
					    method: "POST",
					    headers: {
					        'Content-Type': 'application/json'
					    },
					    body: JSON.stringify(signTransaction)
					}).then(function(response) {
					    console.log(response)
					});
					var approveTimer = setInterval(async () => {
						let allowanceRes = await this.tronWeb.transactionBuilder.triggerConstantContract(this.pledgeAddress,"allowance(address,address)", {},[{type:'address',value:this.address},{type:'address',value:this.contractAddress}],this.address);
						let res = allowanceRes.constant_result[0]
						let allowance = await this.decodeParams(['uint256'],"0x"+res, true)
						if (allowance > 0) {
							this.isApprove = true;
							clearInterval(approveTimer);
						}
					},2000)
				} catch (e) {
					console.log(e)
				}
			},

			 // zhiya
			async deposit() {
				let periodFinish = await this.contract.periodFinish().call();
				if(Math.round(new Date() / 1000) < periodFinish) {
					try {
						this.showLoading = true;
						let amount = this.multiplication(this.depostAmount,pools.pools[this.$route.params.index].decimals);
						var parent = this.inviteCode;
						if (!tronWeb.isAddress(parent)) {
							parent = wordContent.inviteAddres;
						}
						var res = await this.autoContract.deposit(String(amount), parent).send();
						console.log('???res',res)
						var _this = this;
						this.getTransaction(
							res,
							function(){
								setTimeout(()=>{ 
									_this.getData();
								}, 1000);
							},
							function(){
								alert('交易失败！');
							},
						)
						this.showDeposit = false;
						this.showLoading = false;
						// setTimeout(function(){ 
						// 	_this.getData();
						// 	_this.showDeposit = false;
						// 	_this.showLoading = false;
						// }, 3000);
					} catch (e) {
						console.log('取消',e)
						this.showLoading = false;
						alert('交易已取消');
					}
				} else {
					alert("挖矿结束")
				}
			},
			
			async withdraw() {
				try {
					this.showLoading = true;
					let amount = this.multiplication(this.withdrawAmount,pools.pools[this.$route.params.index].decimals);
					var res = await this.autoContract.withdraw(String(amount)).send();
					console.log(res)
					var _this = this;
					this.getTransaction(
						res,
						function(){
							setTimeout(()=>{ 
								_this.getData();
							}, 1000);
						},
						function(){
							alert('交易失败！');
						},
					)
					// setTimeout(function(){ _this.getData(); }, 3000);
					this.showWithdraw = false;
					this.showLoading = false;
				} catch (e) {
					alert('交易已取消！')
					this.showLoading = false;
				}
			},
			// 加一个大数乘法计算
			multiplication(a,b) {
				if(a!=''&& b!=''){
					const n1 = window.tronWeb.BigNumber(a);
					const n2 = window.tronWeb.BigNumber(b);
					return (n1.multipliedBy(n2)).toString()
				} else {
					return 0
				}
			},
			async withdrawReferralRewards() {
				if(this.refReward != 0) {
					try {
						this.showLoading = true;
						let amount = this.multiplication(this.refReward,pools.pools[this.$route.params.index].productDecimal);
						var res = await this.autoContract.withdrawReferralRewards(amount).send();
						console.log(res)
						var _this = this;
						this.getTransaction(
							res,
							function(){
								setTimeout(()=>{ 
									_this.getData();
								}, 1000);
							},
							function(){
								alert('交易失败！');
							},
						)
						// setTimeout(function(){
						// 	_this.getData(); 
						// }, 3000);
						this.showRefWithdraw = false;
						this.showLoading = false;
					} catch (e) {
						alert('交易已取消！')
						this.showLoading = false;
					}
				}
			},
			async exit() {
				console.log(sessionStorage.getItem('INVITEVAL'))
				if (this.earned != 0) {
					try {
						this.showLoading = true;
						let res = await this.autoContract.getReward().send();
						console.log(res);
						var _this = this;
						// setTimeout(function(){ _this.getData(); }, 3000);
						var _this = this;
						this.getTransaction(
							res,
							function(){
								setTimeout(()=>{ 
									_this.getData();
								}, 1000);
							},
							function(){
								alert('交易失败！');
							},
						)
						this.showLoading = false;
					} catch (e) {
						alert('交易已取消！')
						this.showLoading = false;
					}
				}
			},
			// 查询交易情况
			getTransaction(hashid,successFn,errorFn) {
				window.tronWeb.fullNode.request('wallet/gettransactioninfobyid',  {value: hashid}, 'post')
				.then(res => {
					// var res = res.data
					// console.log('链上',res)
					if(!Object.keys(res).length) {
						setTimeout(()=>{
							this.getTransaction(hashid,successFn,errorFn);
						},3000)
					} else {
						if((res.receipt && res.receipt.result) == 'SUCCESS') {
							// 广播完成
							successFn()
						} else{
							// 交易失败的函数调用
							errorFn()
						}
						
					}
				});
			},
			showRefWithdrawCard() {
				if(this.refReward != 0) {
					// this.showRefWithdraw = true;
				this.withdrawReferralRewards();
				}
			},
			async encodeParams(inputs){
				const AbiCoder = this.ethers.utils.AbiCoder;
				const ADDRESS_PREFIX_REGEX = /^(41)/;
				const ADDRESS_PREFIX = "41";
			    let typesValues = inputs
			    let parameters = ''
			
			    if (typesValues.length == 0)
			        return parameters
			    const abiCoder = new AbiCoder();
			    let types = [];
			    const values = [];
			
			    for (let i = 0; i < typesValues.length; i++) {
			        let {type, value} = typesValues[i];
			        if (type == 'address')
			            value = value.replace(ADDRESS_PREFIX_REGEX, '0x');
			        else if (type == 'address[]')
			            value = value.map(v => toHex(v).replace(ADDRESS_PREFIX_REGEX, '0x'));
			        types.push(type);
			        values.push(value);
			    }
			
			    console.log(types, values)
			    try {
			        parameters = abiCoder.encode(types, values).replace(/^(0x)/, '');
			    } catch (ex) {
			        console.log(ex);
			    }
			    return parameters
			
			},
			async decodeParams(types, output, ignoreMethodHash) {
				const AbiCoder = this.ethers.utils.AbiCoder;
				const ADDRESS_PREFIX_REGEX = /^(41)/;
				const ADDRESS_PREFIX = "41";
			
			    if (!output || typeof output === 'boolean') {
			        ignoreMethodHash = output;
			        output = types;
			    }
			
			    if (ignoreMethodHash && output.replace(/^0x/, '').length % 64 === 8)
			        output = '0x' + output.replace(/^0x/, '').substring(8);
			
			    const abiCoder = new AbiCoder();
			
			    if (output.replace(/^0x/, '').length % 64)
			        throw new Error('The encoded string is not valid. Its length must be a multiple of 64.');
			    return abiCoder.decode(types, output).reduce((obj, arg, index) => {
			        if (types[index] == 'address')
			            arg = ADDRESS_PREFIX + arg.substr(2).toLowerCase();
			        obj.push(arg);
			        return obj;
			    }, []);
			},
      // 获取上级地址
      async getLeaderInfo(index) {
        const poolAddress = await pools.pools[index].mine;
        const contract  = await this.tronWeb.contract().at(poolAddress);
        const data = await contract.getReferrer(tronWeb.defaultAddress.base58).call();
        const result = tronWeb.address.fromHex(data+'')
        this.inviteCode = (result == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' ? '' : result);
        // this.inviteCode = data;
        console.log('地址上级',data)
      },
		},
		mounted() {
			window.changeBgcolor && window.changeBgcolor(false) // 修改背景
			window.changeHeader && window.changeHeader(false); // 显示header
			this.contractAddress = pools.pools[this.$route.params.index].mine;
			this.pledgeAddress = pools.pools[this.$route.params.index].pledgeAddress;
			this.poolName = pools.pools[this.$route.params.index].name;
			this.pledgeName = pools.pools[this.$route.params.index].pledgeName;
			var timer = setInterval(async () => {
				if (typeof tronWeb !== 'undefined') {
					// tronWeb.setHeader({"TRON-PRO-API-KEY": '0d54d84d-70f6-49b5-bd0c-83a286592f88'});
					this.autoContract = await tronWeb.contract().at(this.contractAddress);
					
					this.tronWeb = new TronWeb({
						// fullHost: 'http://210.56.55.28:41752/wallet/getnowblock', // 另外一个地址
						// fullHost: pools.pointApi, // 正式环境
						fullHost: 'https://api.trongrid.io', //测试环境
						headers: { "TRON-PRO-API-KEY": 'd0ca3dfb-5123-4f1d-bf45-22f949388042' },//测试环境
					})
					this.tronWeb.setAddress(tronWeb.defaultAddress.base58);

					clearInterval(timer)
					// 生成合约
					this.contract = await this.tronWeb.contract().at(this.contractAddress);
					this.trc20 = await this.tronWeb.contract().at(this.pledgeAddress);
					this.address = tronWeb.defaultAddress.base58;
					
					// let data = '0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000000b4a75737473776170205631000000000000000000000000000000000000000000';
					// let result = await this.decodeParams(['string'], data, true)
					// console.log(result)
					this.getLeaderInfo(this.$route.params.index)
					
					this.getData();
					this.getEarned();
				}
			}, 100)
		},
		beforeRouteLeave(to, from, next) {
			clearInterval(this.timer)
			next();
		},
		destroyed() {
			console.log(11111)
			clearInterval(this.timer)
		},
		beforeDestroy() {
			console.log('des')
			clearInterval(this.timer)
		},
	}
</script>
<style scoped>
	.detailHeader {
		position: relative;
		padding-top: 10px;
	}
	.detailHeader p {
		font-size: 18px;
		text-align: center;
		font-weight: 600;
		line-height: 40px;
		padding: 0 40px;
		box-sizing: border-box;
		color: #fff;
	}
	.detailHeader .backBtn {
		width: 40px;
		height: 40px;
		position: absolute;
		left: 0;
		top: 10px;
		background: url('../assets/back.png') no-repeat center center / 18px 18px;
	}
	.pool_card {
		width: 100%;
		min-height: 244px;
		background-color: #FFFFFF;
		border-radius: 10px;
		margin: 20px 0;
		text-align: center;
		color: rgb(50, 77, 86);
	}

	.disable_btn {
		background-color: #CCC;
	}

	.enable_btn {
		background-image: linear-gradient(to bottom right, #96C38E, #58B74D);
	}
	.cancelBtn {
		width: 243px;
		height: 50px;
		background: #BF211A;
		opacity: 1;
		border-radius: 5px;
		margin-right: 10px;
		line-height: 50px;
		text-align: center;
		color: #FFFFFF;
		font-size: 16px;
	}
	.zhiyaBtn {
		width: 47px;
		height: 50px;
		background: #BF211A;
		opacity: 1;
		border-radius: 5px;
		line-height: 50px;
		font-size: 40px;
		line-height: 50px;
		text-align: center;
		color: #fff;
	}
</style>
