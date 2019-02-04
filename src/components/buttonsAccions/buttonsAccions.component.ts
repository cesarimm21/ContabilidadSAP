import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import contextMenu from 'vue-context-menu';
import VueLocalStorage from 'vue-localstorage';
import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';

import { Notification } from 'element-ui';
@Component({
  name: 'buttons-accions',
  components: { contextMenu }
})
export default class ButtonsAccionsComponent extends Vue {
 
  constructor(){
    super();
  } 
  BuscarSome(){
    this.$emit('handleClickInParent');
  }
  data(){
    return{
      dialogTableVisible: false,
      user: {
        authenticated: false
      },
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
