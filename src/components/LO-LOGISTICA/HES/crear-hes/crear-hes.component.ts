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
  name: 'crear-hes',
  components:{'buttons-accions':ButtonsAccionsComponent}
})
export default class CrearHesComponent extends Vue {
  timer=0;
  valueSwtch:boolean=false;
  codigoCompania:string;
  constructor(){
    super();
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  data(){
    return{
      dialogTableVisible: false,
      codigoCompania:''
    }
  }
  
}
