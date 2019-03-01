// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import TopMenu from '@/components/customs/top-menu/TopMenu.vue'
import Slider from '@/components/slider/slider.vue'
import LoginComponent from '@/components/login/login.vue'
import BarmenuComponent from '@/components/barmenu/barmenu.vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import bootstrapvue from 'bootstrap-vue'
import InfiniteScroll from 'vue-infinite-scroll';
import './assets/css/style.scss';
import VueChart from 'vue-chart-js'
//import 'font-awesome/css/font-awesome.css';
import locale from 'element-ui/lib/locale/lang/es'
import VeeValidate from 'vee-validate'
import { Validator } from 'vee-validate';

Vue.use(VueChart)
Vue.use(ElementUI, { locale })
Vue.use(ElementUI)
Vue.use(InfiniteScroll)
Vue.use(bootstrapvue);
/*Vue.component('slider',Slider)*/
Vue.component('login',LoginComponent)
import { Progress } from 'bootstrap-vue/es/components'
Vue.use(Progress)
Validator.extend('age', {
  getMessage: (field, [args]) => `The ${field} must be older than or equal to ${args}.`,
  validate: (value, [args]) => parseInt(value) >= parseInt(args)
});

Vue.use(VeeValidate);
/*Vue.component('barmenu',BarmenuComponent)
Vue.component('top-menu',TopMenu)*/
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: (h) => h(App)
})
