import Vue from 'vue'
import App from './App.vue'
import router from './router'
import clipboard from 'clipboard'
import Overlay from 'vant/lib/overlay';
import 'vant/lib/overlay/style';
import Field from 'vant/lib/field';
import 'vant/lib/field/style';
import Loading from 'vant/lib/loading';
import 'vant/lib/loading/style';
var ethers = require('ethers')

Vue.use(Overlay).use(Field).use(Loading);

Vue.prototype.clipboard = clipboard;
Vue.prototype.ethers = ethers;
Vue.config.productionTip = false

new Vue({
  router,
  render: function (h) { return h(App) }
}).$mount('#app')
