<template>
  <div id="app" :class="isIndex ? 'bodybg1' : 'bodybg2'">
    <div style="width: 100%" v-show="showHeader">
      <div class="head">
        <div style="width:20px"></div>
        <div
          @click="goIndex('/')"
          class="item"
          :style="tab != 1 && { fontWeight: '400' }"
        >
          首页
          <span v-show="tab == 1"></span>
        </div>
        <div
          class="item"
          :style="tab != 2 && { fontWeight: '400' }"
          @click="goPools"
        >
          矿池
          <span v-show="tab == 2"></span>
        </div>
        <div
          class="item"
          :style="tab != 3 && { fontWeight: '400' }"
          @click="goTeam"
        >
          团队
          <span v-show="tab == 3"></span>
        </div>
        <img
          src="./assets/wallet.png"
          style="width: 20px; height: 20px"
          @click="showWallet = true"
        />
        <!-- <div style="color: #FFFFFF;line-height: 28px;font-weight: bold;height: 28px;width: 60px;text-align: center;border-radius: 15px;box-shadow: rgb(61 100 87) 0px 0px 8px;background-image: linear-gradient(to bottom right, #8FD3A4, #49D579);" @click="showWallet = true">钱包</div> -->
      </div>
    </div>
    <van-overlay :show="showWallet" @click="showWallet = false">
      <div class="card">
        <div @click.stop class="wallet">
          <h3
            style="
              color: rgb(50, 77, 86);
              text-align: center;
              font-size: 18;
              font-weight: bold;
            "
          >
            我的钱包
          </h3>
          <!-- <div style="width: 100px;height: 100px;box-shadow: #CCC 0px 0px 8px;border-radius: 50%;margin: 0 auto;margin-top: 20px;overflow: hidden;"> -->
          <!-- <img style="width: 100px;margin: 0 auto;display: block;margin-top: 10px;" src="./assets/logo.png" alt=""> -->
          <!-- </div> -->
          <h1
            style="
              color: rgb(50, 77, 86);
              text-align: center;
              font-size: 28;
              font-weight: bold;
              margin-top: 30px;
              margin-bottom: 40px;
              word-break: break-all;
            "
          >
            {{ balance }}
          </h1>
          <!-- <p style="text-align: center;color: #CCCCCC;">Orange余额</p> -->
          <div @click="toTronScan" class="dialogBtn">在TronScan查看</div>

          <div @click="showWallet = false" class="dialogBtn1">返回页面</div>
        </div>
      </div>
    </van-overlay>
    <keep-alive include="Home">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
// import pools from './config/pools.js'
import TronWeb from "tronweb";
import Home from "./views/Home.vue";
export default {
  name: "App",
  data() {
    return {
      balance: 0,
      showWallet: false,
      tronScanUrl: "",
      tronWeb: null,
      pools: pools,
      isIndex: true,
      tab: 1,
      showHeader: true,
      coinName: wordContent.coinName,
    };
  },
  mounted() {
    this.parent = this.$route.query.ref;
    this.changeBg(this.$route.name !== "pool");
    const self = this;
    window.changeBgcolor = function (val, tab) {
      self.changeBg(val, tab);
    };
    window.changeHeader = function (val) {
      self.showHeaderFn(val);
    };
    // 下面都是紧急注释
    var timer = setInterval(async () => {
      if (typeof tronWeb !== "undefined") {
        this.tronWeb = new TronWeb({
          // fullHost: 'http://210.56.55.28:41752/wallet/getnowblock', // 另外一个地址
          // fullHost: pools.domain, // 正式环境
          fullHost: "https://api.trongrid.io", //测试环境
          headers: {"TRON-PRO-API-KEY": "d0ca3dfb-5123-4f1d-bf45-22f949388042",}, //测试环境
        });
        this.tronWeb.setAddress(tronWeb.defaultAddress.base58);

        // tronWeb.setHeader({"TRON-PRO-API-KEY": '0d54d84d-70f6-49b5-bd0c-83a286592f88'});
        clearInterval(timer);
        // 生成合约
        let coinContract = await this.tronWeb.contract().at(pools.produceCoin);
        this.balance = await coinContract
          .balanceOf(tronWeb.defaultAddress.base58)
          .call();
        this.balance = parseFloat(this.balance / pools.decimals).toFixed(5);
        this.balance = this.balance.substring(
          0,
          this.balance.lastIndexOf(".") + 5
        );
        this.tronScanUrl =
          "https://tronscan.org/#/address/" + tronWeb.defaultAddress.base58;

        if (tronWeb.isAddress(this.parent)) {
          localStorage.setItem("parent", this.parent);
        } else {
          localStorage.setItem("parent", wordContent.inviteAddres);
        }
      }
    }, 100);
  },
  methods: {
    goTeam() {
      this.isIndex = true;
      this.tab = 3;
      this.$router.push("/team");
    },
    goPools() {
      this.isIndex = true;
      this.tab = 2;
      this.$router.push("/pools");
    },
    goIndex() {
      this.isIndex = true;
      this.tab = 1;
      this.$router.replace("/");
    },
    toTronScan() {
      window.location.href = this.tronScanUrl;
    },
    changeBg(type, tab) {
      this.isIndex = type;
      if (tab) {
        this.tab = tab;
      }
    },
    showHeaderFn(val) {
      this.showHeader = val;
    },
  },
};
</script>

<style>
.bodybg1 {
  background: url("./assets/indexbg.png") no-repeat left top / 100% auto;
}
.bodybg2 {
  background: url("./assets/detailbg.png") no-repeat left top / 100% 100%;
}
* {
  margin: 0;
  padding: 0;
}

html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  /* background-color: rgb(50, 77, 86); */
}
.head {
  margin: 0 auto;
  width: 100%;
  height: 70px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #fff;
  padding: 0 15px;
  box-sizing: border-box;
}
.item {
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  text-decoration: none;
  position: relative;
}
.item span {
  position: absolute;
  bottom: -6px;
  left: 50%;
  margin-left: -15px;
  width: 30px;
  height: 4px;
  border-radius: 2px;
  background: #fff;
}
.router-link-active {
  color: rgb(101, 173, 88);
}

@media screen and (max-width: 500px) {
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: flex-end;
  }

  .wallet {
    width: 500px;
    height: 300px;
    background-color: #ffffff;
    border-radius: 10px 10px 0 0;
    box-shadow: #ccc 0px 0px 8px;
    padding: 5%;
  }
}

@media screen and (min-width: 501px) {
  .card {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .wallet {
    width: 500px;
    height: 340px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: #ccc 0px 0px 8px;
    padding: 5%;
  }
}
.dialogBtn {
  width: 100%;
  height: 50px;
  background: #bf211a;
  box-shadow: 0px 0px 5px rgba(213, 213, 213, 0.5);
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
}
.dialogBtn1 {
  width: 100%;
  height: 50px;
  background: #fffbf6;
  border: 1px solid #bf211a;
  box-shadow: 0px 0px 5px rgba(213, 213, 213, 0.5);
  color: #bf211a;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
  border-radius: 5px;
  margin-top: 20px;
}
</style>
