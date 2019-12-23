import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import BootstrapVue from "bootstrap-vue";
import store from "./store";
import "./global";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "./assets/style/elementVariables.scss";
import global from "./assets/style/global.scss";
import "./assets/global_style.css";
import utils from "./utils/common";
Vue.config.productionTip = false;
let lang = localStorage.lang;
require("./assets/sass/app.scss");
window.Vue = Vue;
Vue.use(BootstrapVue)
Vue.config.productionTip = false
window.GlobalEvent = new Vue;
// const Web3 = require('web3.js-thk');
// var web3 = new Web3();
// web3.setProvider(new web3.providers.HttpProvider('http://43.247.184.50:8079'));
// window.web3 = web3;
// window.Web3 = Web3;
const Web3 = require('web3');
window.Web3 = Web3;
// window.web3 = new Web3(new Web3.providers.HttpProvider(localStorage['ganache-host'] || document.location.protocol + window.location.search + '/solc'));
window.web3 = new Web3(new Web3.providers.HttpProvider('http://contract-ide.thinkey.xyz/solc'));
// window.web3 = new Web3(new Web3.providers.HttpProvider(document.location.protocol + window.location.search + "/solc"));
// window.web3 = new Web3(new Web3.providers.HttpProvider(localStorage['ganache-host'] || document.location.protocol + window.location.search + '/solc'));
window.axios = require('axios');

import AccountManager from './assets/edit_js/AccountManager';
window.accountManager = new AccountManager();
require('./assets/edit_js/keylistener');
if (lang && lang !== "zh_CN") {
  import(`element-ui/lib/locale/lang/${lang}`).then(item => {
    let locale = item.default;
    Vue.use(ElementUI, { locale });
  });
} else {
  Vue.use(ElementUI);
}
Vue.use(utils);
new Vue({
  router,
  store,
  global,
  render: h => h(App)
}).$mount("#app");