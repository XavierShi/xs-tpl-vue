{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'

import 'base/rem'

{{#router}}
import router from './router'
router.beforeEach(function (to, from, next) {
  next();
});

router.afterEach(function (to, from) {});
{{/router}}

import FastClick from 'fastclick'
FastClick.attach(document.body)

import store from "@/store";

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  store,
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
