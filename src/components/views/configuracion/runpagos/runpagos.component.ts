import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import router from '@/router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import '../../assets/css/docNuevo.scss';
import contextMenu from 'vue-context-menu';
import MessageBox from 'vue-msgbox';
import swal from 'sweetalert'
import VueSweetAlert from 'vue-sweetalert';
import {Pagination, PaginationEvent} from 'vue-pagination-2';
import Modal from 'modal-vue';
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import * as CONFIG from '@/Config';
import axios from 'axios';
import { Notification } from 'element-ui';
import { Loading } from 'element-ui';
Vue.use(BootstrapVue);

@Component({
   name: 'runpagos',
   components: { contextMenu,Pagination,Modal }
})
export default class Runpagos extends Vue {
  outerVisible:boolean=false;
  url:string;
  constructor(){
    super();
    this.url='../../../../images/icon_validar.png';
  }  
  viewMoneda(){
      this.outerVisible=true; 
  }
  data() {
    return {
      gridData: [],      
      outerVisible:false
    }
  }

}