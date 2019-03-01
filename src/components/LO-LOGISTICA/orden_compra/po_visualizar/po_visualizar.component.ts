import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';


import Login from '@/components/login/login.vue';
import Roles from '@/components/roles/roles.vue';
import UsuarioService from '@/components/service/usuario.service';
import LoginService from '@/components/service/login.service';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
@Component({
    name: 'visualizar-po'
})
export default class VisualizarPOComponent extends Vue {
    constructor(){
        super();
        Global.nameComponent='visualizar-po';
    }
    data(){
        return{
        }
      }
  }