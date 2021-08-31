<template>
	<span class="timeTxt">
		<span>{{day}}天</span>
		<span>{{hour}}时</span>
		<span>{{minte}}分</span>
		<span>{{second}}秒</span>
	</span>
</template>

<script>
	// import pools from '../config/pools.js'
	export default {
		name: 'cutDown',
		props: [ 'time','poolIndex' ],
		data() {
			return {
				day: 0,
				hour: 0,
				minte: 0,
				second: 0,
				clock: null
			}
		},
		methods: {
			setCutdown(nums) {
				var self = this;
				this. clock = setInterval(() => {
					nums--;
					if(nums > 0){
						let leftd = Math.floor(nums/(60*60*24)),  //计算天数
						lefth = Math.floor(nums/(60*60)%24),  //计算小时数
						leftm = Math.floor(nums/(60)%60),  //计算分钟数
						lefts = Math.floor(nums%60);  //计算秒数
						
						self.day = leftd;
						self.hour = lefth;
						self.minte = leftm;
						self.second = lefts;
					}else{
						clearInterval(self.clock);
						self.$emit('onEnd',self.poolIndex)
					}
				},1000);
			}
		},
		mounted() {
			const data = Math.floor((new Date(this.time).getTime() - new Date().getTime())/1000);
			this.setCutdown(data)
		},
		destroyed() {

		}
		
	}
</script>

<style scoped="">
	.timeTxt {
		
	}
	.timeTxt span {
		font-size: 14px;
		font-family: Microsoft YaHei;
		font-weight: bold;
		line-height: 19px;
		color: #333333;
		margin-top: 15px;
		text-align: center;
	}
</style>
