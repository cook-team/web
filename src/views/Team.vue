<template>
	<div class="team">
    <div class="leader_view">
      <img :src="require('../assets/team1.png')"/>
      <p>我的上级</p>
      <p>ADD***DS8F</p>
    </div>
    <div class="pool_tab_view">
      <div class="pool_tab">
        <div class="pool_tab_item" v-for="(item,index) in poolList" :key="index" @click="clickpoolTab(item,index)">
          <p :class="tabIndex==index?'choose_pool_tab2':'normal_pool_tab2'">{{index+1}}号矿池</p>
        </div>
      </div>
    </div>
    <div class="table_view">
      <div class="table">
        <div class="table_title">
          <p class="width103 titletxt">我的直推</p>
          <p class="flex1 titletxt marginLR">我的间推</p>
          <p class="flex1 titletxt">团队质押量</p>
        </div>
        <div class="table_title table_item" v-for="(item,key) in poolList" :key="key">
          <p class="width103 userinfo">TA5***GCY9</p>
          <p class="flex1 itemtxt">2</p>
          <p class="flex1 itemtxt">22</p>
        </div>
      </div>
    </div>
    <div style="height:30px"></div>
	</div>
</template>

<script>
	export default {
		name: 'Pools',
		data() {
			return {
        poolList: pools.pools,
        tabIndex: 0,
        
			}
		},
		methods: {
      clickpoolTab(item,index) {
        if(index!== this.tabIndex) {
          this.tabIndex = index;
          this.getTableInfo(index);
          this.getLeaderInfo(index);
        }
      },
      //  获取推荐信息
      async getTableInfo(index) {
        const poolAddress = await pools.pools[index].mine;
        console.log('poolAddress',poolAddress)
        const contract  = await tronWeb.contract().at(poolAddress);
        console.log('contract',contract)
        const data = await contract.getReferralRewards(tronWeb.defaultAddress.base58).call();
        console.log('数据',parseFloat(data/1e16).toFixed(8))
      },
      // 获取上级地址
      async getLeaderInfo(index) {
        const poolAddress = await pools.pools[index].mine;
        console.log('poolAddress',poolAddress)
        const contract  = await tronWeb.contract().at(poolAddress);
        console.log('contract',contract)
        const data = await contract.getReferrer(tronWeb.defaultAddress.base58).call();
        console.log('数据',data)
      }
    },
    mounted() {
      window.changeBgcolor && window.changeBgcolor(true,3) // 修改背景
			window.changeHeader && window.changeHeader(true); // 显示header
      this.getLeaderInfo(0);
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
  }
  .table {
    width: 100%;
    height: auto;
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
</style>
