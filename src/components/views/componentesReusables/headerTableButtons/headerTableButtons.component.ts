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
import '../../../assets/css/topmenu.scss';
import { Notification } from 'element-ui';
import GLOBAL from '../../../../Global';
@Component({
  name: 'header-buttons',
  components: { contextMenu }
})
export default class HeaderTableButtons extends Vue {
  
  constructor(){
    super();
  } 
  data(){
    return{
      dialogTableVisible: false
    }
  }
  
}
