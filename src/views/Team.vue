<template>
	<div class="team">
    <div class="pool_tab_view">
      <div class="pool_tab">
        <div class="pool_tab_item" v-for="(item,index) in poolList" :key="index" @click="clickpoolTab(item,index)">
          <p :class="tabIndex==index?'choose_pool_tab1':'normal_pool_tab1'">2人</p>
          <p :class="tabIndex==index?'choose_pool_tab2':'normal_pool_tab2'">1号矿池</p>
        </div>
      </div>
    </div>
    <div class="table_view">
      <div class="table">
        <div class="table_title">
          <p class="flex1 titletxt">用户</p>
          <p class="width60 titletxt marginLR">直推人数</p>
          <p class="width60 titletxt">团队人数</p>
        </div>
        <div class="table_title table_item" v-for="(item,key) in poolList" :key="key">
          <div class="userinfo flex1">
            <img />
            <p>TRA***SND4</p>
          </div>
          <p class="width60 itemtxt marginLR">2</p>
          <p class="width60 itemtxt">22</p>
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
        poolList: [1,2,3,4,5,6,7,8,9,10],
        tabIndex: 0
			}
		},
		methods: {
      clickpoolTab(item,index) {
        this.tabIndex = index;
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
    height: 100px;
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
    width: 60px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-left: 24px;
    height: 100%;
  }
  .choose_pool_tab1 {
    font-size: 18px;
    color: #CF3428;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .normal_pool_tab1 {
    font-size: 16px;
    color: #333;
    margin-bottom: 10px;
  }
  .choose_pool_tab2 {
    font-size: 14px;
    color: #CF3428;
    font-weight: bold;
  }
  .normal_pool_tab2 {
    font-size: 14px;
    color: #999999;
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
    padding: 0 15px;
    box-sizing: border-box;
  }
  .titletxt {
    font-size: 14px;
    color: #333;
    text-align: left;
  }
  .flex1 {
    flex: 1
  }
  .width60 {
    width: 60px;
    flex-shrink: 0;
  }
  .marginLR {
    margin: 0 20px;
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
    display: flex;
    align-items: center;
  }
  .userinfo img {
    width: 25px;
    height: 25px;
    margin-right: 10px;
    border-radius: 50%;
  }
  .userinfo p {
    font-size: 12px;
    color: #333;
  }
</style>
