{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'

import "fa-reset"
import FastClick from 'fastclick'
FastClick.attach(document.body)

{{#router}}
import router from './router'

router.beforeEach(function (to, from, next) {
  next();
});

router.afterEach(function (to, from) {});
{{/router}}

import {AlertPlugin, ConfirmPlugin, DatetimePlugin, LoadingPlugin, ToastPlugin} from 'vux'
import 'vux/src/styles/1px.less'
import 'vux/src/styles/close.less'

Vue.use(AlertPlugin)
Vue.use(ToastPlugin)
Vue.use(ConfirmPlugin)
Vue.use(LoadingPlugin)
Vue.use(DatetimePlugin)

import 'base/rem'


Vue.config.productionTip = false

//  引入vuex
import store from "@/store";

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  store,
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
