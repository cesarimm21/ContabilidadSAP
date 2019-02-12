import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';

import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { Notification } from 'element-ui';
@Component({
  name: 'crear-ingreso-comprobante',
  components:{'buttons-accions':ButtonsAccionsComponent}
})
export default class CrearIngresoComprobanteComponent extends Vue {
  timer=0;
  codigoCompania:string;
  descripcionCompania:string;
  constructor(){
    super();
  }
  //*test
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    //GLOBAL.limpiarDatosSession();
    router.push('/')
  }
  confirmaraceptar(){
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(route){
    router.push(route)
  }
  data(){
    return{
      dialogTableVisible: false,
      codigoCompania:'001',
      descripcionCompania:'Secocha'
    }
  }
  
}
