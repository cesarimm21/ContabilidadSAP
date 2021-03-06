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
import '../../../assets/css/topmenu.scss';
import { Notification } from 'element-ui';
import GLOBAL from '../../../Global';
@Component({
  name: 'top-menu',
  
})
export default class TopMenu extends Vue {
  timer=0;
  hours:number;
  minutos:number;
  seconds:number;
  user:any;
  tiempoagotado:any;
  compania:any;
  contador:any=0;
  _10min:boolean=false;
  ocultarConfig:boolean = true;
  ocultar:boolean=false;
  codigo:string;
  nameuser:any;
  namecomplete:string;
  accesosUser:any=[];
  isActive:boolean=false;
  isCollapse:boolean=false;
  constructor(){
    super();
    this.isActive=GLOBAL.isActive;
    this.isCollapse=GLOBAL.isCollapse;
   // this.ChechAccess();
  this.namecomplete='Cordova';  
  this.getAccesos();
  // this.update();
  }
  getAccesos(){ 
    this.nameuser=localStorage.getItem('User_Usuario');
    var data=localStorage.getItem('compania_name');
    this.compania=data;
    // var test=localStorage.getItem('User_Cargo');
    // UsuarioService.GetUsuarioAccesos()
    // .then(response => {
    //   for (var i=0; i< response.Data.length; i++){
    //     if(response.Data[i].intNivel == 2){
    //       this.accesosUser.push({
    //         strNombre: response.Data[i].strNombre,
    //         intIndex:response.Data[i].intIndex,
    //         strClickName:response.Data[i].strClickName,
    //         strIconName:response.Data[i].strIconName,
    //         strEnlace:response.Data[i].strEnlace
    //       });          
    //     }
    //   }
    //   if(this.accesosUser.length === 0){
    //     this.ocultarConfig = false;
    //   }
    // })
    // .catch(e =>{
    //   console.log(e);
    //   if(e.response.status === 401){ // token no valido
    //     this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
    //   }
    //   else{
    //     this.openMessageError('Error al cargar accesos');
    //   }
    // })
  }
  clickActive(){
    if(this.codigo==''){
    this.ocultar=!this.ocultar;
    }
    else{
      //hace busqueda
    }
    
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
  fnOcultar(){
    this.ocultar=!this.ocultar;
  }
  loadBarmenu(){
    this.$emit('getLink',this.codigo);
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
  //         Notification.warning('Su tiempo de Sesion ha expirado, Vuelva a iniciar sesion')
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
  
  clickHamburger () {
    debugger;    
    this.isActive=!GLOBAL.getActive()
    this.isCollapse=!GLOBAL.getCollapse()
    GLOBAL.setActive(this.isActive);
    GLOBAL.setCollapse(this.isCollapse);
    this.$emit('proveedorSeleccionado');
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
      seconds:0,
      codigo:'',
    }
  }
  
}
