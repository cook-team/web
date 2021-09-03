<template>
	<div class="team">
    <div class="leader_view">
      <img :src="require('../assets/team1.png')"/>
      <p>我的上级</p>
      <p style="min-width:90px">{{leaderAddress?(leaderAddress.slice(0,3)+'***'+leaderAddress.slice(-4)):''}}</p>
    </div>
    <div class="pool_tab_view">
      <div class="pool_tab">
        <div class="pool_tab_item" v-for="(item,index) in poolList" :key="index" @click="clickpoolTab(item,index)">
          <p :class="tabIndex==index?'choose_pool_tab2':'normal_pool_tab2'">{{index+1}}号矿池</p>
        </div>
      </div>
    </div>
    <div class="table_view" :style="{height: windowH }">
      <div class="table">
        <div class="table_title">
          <p class="width103 titletxt">我的直推</p>
          <p class="flex1 titletxt marginLR">我的间推</p>
          <p class="flex1 titletxt">团队质押量</p>
        </div>
        <p v-if="table.length==0" class="notData">暂无数据</p>
        <div v-else class="table_title table_item" v-for="(item,key) in table" :key="key">
          <p class="width103 userinfo">{{item.address.slice(0,3)+'***'+item.address.slice(-4)}}</p>
          <p class="flex1 itemtxt">{{item.JJpush}}</p>
          <p class="flex1 itemtxt">{{item.ZYsun}}</p>
        </div>
      </div>
    </div>
    <div class="footer">
      <p @click="beforePage">上一页</p>
      <p>第{{this.page + 1}}页</p>
      <p @click="nextPage">下一页</p>
    </div>
	</div>
</template>

<script>
import TronWeb from 'tronweb'
	export default {
		name: 'Pools',
		data() {
			return {
        windowH: window.innerHeight - 190 - 60 + 'px',
        poolList: pools.pools,
        leaderAddress: '',
        tabIndex: 0,
        page: 0,
        table: [],
        next: true,
        tronWeb: {},
			}
		},
		methods: {
      clickpoolTab(item,index) {
        if(index!== this.tabIndex) {
          this.tabIndex = index;
          this.getTableInfo(index);
          this.getLeaderInfo(index);
          this.page = 0;
          this.table = [];
          this.next = true;
        }
      },
      //  获取推荐信息
      async getTableInfo(index) {
        const poolAddress = await pools.pools[index].mine;
        const contract  = await this.tronWeb.contract().at(poolAddress);
        const data = await contract.getRecommend(tronWeb.defaultAddress.base58,this.page).call();
        const pageSum = (data[3]*1).toFixed(0); // 当前页的条数
        const tableSum = (data[4]*1).toFixed(0) // 总条数
        console.log('@@@',tableSum)
        if(!!tableSum) {
          this.table = [];
          return 
        }
        if(!!pageSum) { // 下一页没有数据的情况
          alert('已经到最后一页了！')
          this.page = this.page - 1;
          return 
        }
        if(pageSum < 10) {
          this.next = false;
          
        }
        const list = data[0].map((item,index)=>{
          return {
            address: item,
            JJpush: (data[1][index]*1).toFixed(0),
            ZYsun: (data[2][index]*1).toFixed(0)
          }
        });
        this.table = list;
      },
      // 获取上级地址
      async getLeaderInfo(index) {
        const poolAddress = await pools.pools[index].mine;
        const contract  = await this.tronWeb.contract().at(poolAddress);
        console.log('contract',contract)
        const data = await contract.getReferrer(tronWeb.defaultAddress.base58).call();
        const result = tronWeb.address.fromHex(data+'')
        this.leaderAddress = (result == 'T9yD14Nj9j7xAB4dbGeiX9h8unkKHxuWwb' ? '' : result);
      },
      beforePage() {
        if(this.page==1) {
          return 
        }
        this.page = this.page - 1;
        this.getTableInfo(this.tabIndex);
      },
      nextPage() {
        if(this.table.length == 0) {
          return 
        }
        if(!this.next) {
          return 
        }
        this.page = this.page + 1;
        this.getTableInfo(this.tabIndex);
      },
    },

    mounted() {
      window.changeBgcolor && window.changeBgcolor(true,3) // 修改背景
			window.changeHeader && window.changeHeader(true); // 显示header
      if (typeof tronWeb !== 'undefined') { 
        this.tronWeb = new TronWeb({
          fullHost: pools.pointApi, // 正式环境
          // fullHost: 'https://api.trongrid.io', //测试环境
          // headers: { "TRON-PRO-API-KEY": 'd0ca3dfb-5123-4f1d-bf45-22f949388042' },//测试环境
        })
        this.tronWeb.setAddress(tronWeb.defaultAddress.base58);
        this.$nextTick(()=>{
          this.getTableInfo(this.tabIndex);
          this.getLeaderInfo(this.tabIndex);
        })
      }
    }
	}
</script>

<style scoped="">
	.pool_tab_view {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
  }
  .pool_tab {
    width: 100%;
    height: 60px;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(136, 136, 136, 0.25);
    opacity: 1;
    border-radius: 10px;
    margin-bottom: 21px;
    display: flex;
    align-items: center;
    overflow-x: auto;
  }
  .pool_tab_item {
    width: 74px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 24px;
    height: 100%;
  }
  .choose_pool_tab2 {
    font-size: 14px;
    font-weight: bold;
    width: 74px;
    height: 30px;
    background: #C3261D;
    opacity: 1;
    border-radius: 15px;
    line-height: 30px;
    text-align: center;
    color: #fff;
  }
  .normal_pool_tab2 {
    font-size: 14px;
    color: #333;
    width: 74px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    background: #EEEEEE;
    opacity: 1;
    border-radius: 15px;
  }
  .table_view {
    width: 100%;
    padding: 0 15px;
    box-sizing: border-box;
    overflow: auto;
    padding-bottom: 15px;
  }
  .table {
    width: 100%;
    min-height: 100%;
    background: #FFFFFF;
    box-shadow: 0px 0px 10px rgba(136, 136, 136, 0.25);
    opacity: 1;
    border-radius: 10px;
    overflow: hidden;
  }
  .table_title {
    width: 100%;
    height: 50px;
    background: #FFF1F1;
    opacity: 1;
    border-radius: 10px 10px 0px 0px;
    display: flex;
    align-items: center;
    box-sizing: border-box;
  }
  .titletxt {
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .width103 {
    width: 103px;
    flex-shrink: 0;
  }
  .flex1 {
    flex: 1
  }
  .marginLR {
    margin: 0 5px;
  }
  .table_item {
    background: #fff;
    height: 54px;
    border-bottom: 1px solid #CCCCCC;
  }
  .table_item:last-child {
    border-bottom: none;
  }
  .itemtxt {
    font-weight: bold;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .userinfo {
    font-size: 12px;
    color: #333;
    text-align: center;
  }
  .leader_view {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  .leader_view img {
    width: 14px;
    height: 14px;
    margin-right: 6px;
  }
  .leader_view p {
    font-size: 14px;
    color: #fff;
  }
  .leader_view p:last-child {
    font-weight: bold;
    margin-left: 11px;
  }
  .footer {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    width: 100%;
  }
  .footer p {
    font-size: 14px;
    color: #333;
  }
  .footer p:nth-child(2) {
    color: #C3261D;
    margin: 0 30px;
    font-size: 13px;
  }
  .notData {
    width: 100%;
    height: 200px;
    line-height: 200px;
    text-align: center;
    font-size: 14px;
    color: #999;
  }
</style>
