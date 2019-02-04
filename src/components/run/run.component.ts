import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import contextMenu from 'vue-context-menu';
import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

import { Notification } from 'element-ui';
@Component({
  name: 'run-pagos',
  components: { contextMenu, 'buttons-accions':ButtonsAccionsComponent}
})
export default class RunComponent extends Vue {
    outerVisible:boolean=false;
    url:string;
  constructor(){
    super();
  }
  viewMoneda(){
    this.outerVisible=true; 
    }
  handleClickInParent(val){
    console.log('algo saldra');
    
  }  
  data(){
    return{
        gridData: [],      
        outerVisible:false
    }
  }
  
}
