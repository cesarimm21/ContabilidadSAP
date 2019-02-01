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
  name: 'quickaccessmenu',
  components: { contextMenu }
})
export default class QuickAccessMenuComponent extends Vue {
  timer=0;
  hours:number;
  minutos:number;
  seconds:number;
  user:any;
  tiempoagotado:any;
  contador:any=0;
  _10min:boolean=false;
  ocultarConfig:boolean = true;
  nameuser:string;
  namecomplete:string;
  accesosUser:any=[];
  constructor(){
    super();
   // this.ChechAccess();
  // this.nameuser=''+localStorage.getItem('User_Usuario');
  // this.namecomplete=''+localStorage.getItem('User_Nombre');
  // this.getAccesos();
  // this.update();
  }

  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    //GLOBAL.limpiarDatosSession();
    router.push('/')
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
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    router.push('/')
  }
  calcular(temp){
    //alert(temp);
    if(temp < 600){
      return { rojo: true,}
    }
    else{
      return { verde: true, }
    }
  }
  // update(){
  //     if (this.contador == 0) {
  //         LoginService.getTokenTime()
  //         .then(r => {
  //           console.log(r);
  //           this.contador= r*59;
  //         }).catch(e =>{
  //           console.log('Error: ',e);
  //           this.openMessageError('Error al intentar conectar al servicio.');
  //           window.sessionStorage.clear();
  //           router.push('/')
  //           window.location.reload();            
  //         });
  //       console.log(this.contador);        
  //       this._10min = true;
  //     }
  //     else {  
  //       this.contador = this.contador - 1;
  //       this.minutos = Math.ceil(this.contador/60);
  //       this.seconds = this.contador%60; 
        
  //       this.calcular( this.contador);
  //       if (this._10min && this.contador < 600) {
  //         this._10min = false;
  //         this.$alert('Oh no! Su tiempo se esta agotando,muy pronto se reiniciara el programa', 'Tiempo Expirado', {
  //           confirmButtonText: 'OK',
  //           type: 'warning',
  //           callback: action => {
  //             // this.$message({
  //             //   type: 'info',
  //             //   message: `action: ${ action }`
  //             // });
  //           }
  //         });
  
  //       }
  //       if(this.contador === 0){
  //         Notification.warning('Su tiempo de Sesión ha expirado, Vuelva a iniciar sesión')
  //         window.sessionStorage.clear();
  //         router.push('/')
  //         window.location.reload();
  //       }  
  //     }
  //     setTimeout(() => this.update(), 1000)
  // }
  // async get_Data() {
  //   console.log("hola");
    
  //   //console.log(this.contador);
  // }
  // created() {
  //   if(typeof window != 'undefined') {
  //     // this.getAccesos();
  //     this.update();
  //   }
  // }
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