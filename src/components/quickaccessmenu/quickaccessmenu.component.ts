import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import Global from '@/Global';
//**BUS */
import {bus} from '../../main';

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
  name: 'quickaccessmenu'
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
  ocultar:boolean=false;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  myModalRef:boolean=false;
  constructor(){
    super();
   // this.ChechAccess();
  // this.nameuser=''+localStorage.getItem('User_Usuario');
  // this.namecomplete=''+localStorage.getItem('User_Nombre');
  // this.getAccesos();
  // this.update();
  }
  //*test
  proveedorSeleccionado(val){
    debugger;
  }

  backPage(){
    this.$emit('backPage',Global.nameComponent);
  }
  reloadpage(){
    this.$emit('reloadpage',Global.nameComponent);
  }

  fnOcultar(){
    this.ocultar=!this.ocultar;
  }
  guardar(){
    this.dialogVisible=true;
    this.SendDocument=true;
    //this.$refs.myModalRef.show();
    // if(Global.nameComponent==='crear-ingreso-comprobante'){
    //   bus.$emit('SaveFactura',Global.nameComponent);
    // }
    // if(Global.nameComponent==='crear-hes'){
    //   bus.$emit('SaveHes',Global.nameComponent);
    // }
    // if(Global.nameComponent==='edit-hes'){
    //   bus.$emit('EditHes',Global.nameComponent);
    // }
    // if(Global.nameComponent==='view-hes'){
    //   bus.$emit('ViewHes',Global.nameComponent);
    // }
    // if(Global.nameComponent==='crear-proveedor'){
    //   bus.$emit('SaveProveedor',Global.nameComponent);
    // }   
    // if(Global.nameComponent==='modificar-proveedor'){
    //   bus.$emit('EditProveedor',Global.nameComponent);
    // }   
    // if(Global.nameComponent==='visualizar-proveedor'){
    //   bus.$emit('ViewProveedor',Global.nameComponent);
    // }   
  }
  validar(){
    // if(Global.nameComponent==='crear-proveedor'){
    //   bus.$emit('ValidadProveedor',Global.nameComponent);
    // }  
    // if(Global.nameComponent==='modificar-proveedor'){
    //   bus.$emit('ValEditProveedor',Global.nameComponent);
    // }  
    // if(Global.nameComponent==='visualizar-proveedor'){
    //   bus.$emit('ValViewProveedor',Global.nameComponent);
    // }  
    // if(Global.nameComponent==='crear-hes'){
    //   bus.$emit('ValidadHes',Global.nameComponent);
    // }  
    // if(Global.nameComponent==='edit-hes'){
    //   bus.$emit('ValEditHes',Global.nameComponent);
    // }  
    // if(Global.nameComponent==='view-hes'){
    //   bus.$emit('ValViewHes',Global.nameComponent);
    // }  
  }
  
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  submit(){
    alert("entro");
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
  confirmaraceptar(){
    //alert("Excelente");
    this.SendDocument=false;
    if(Global.nameComponent==='crear-po'){
      this.$emit('guardarPO',Global.nameComponent);  
    }  
    if(Global.nameComponent==='modificar-po'){
      this.$emit('guardarEditPO',Global.nameComponent);  
    }  
    if(Global.nameComponent==='crear-hes'){
      this.$emit('guardarHES',Global.nameComponent);
    }
    if(Global.nameComponent==='edit-hes'){
      this.$emit('guardarEditHES',Global.nameComponent);
    }
    if(Global.nameComponent==='crear-proveedor'){
      this.$emit('guardarProveedor',Global.nameComponent);
    }
    if(Global.nameComponent==='modificar-proveedor'){
      this.$emit('actualizarProveedor',Global.nameComponent);
    }
    if(Global.nameComponent==='factura'){
      this.$emit('SaveFactura',Global.nameComponent);
    }
    // this.$emit('guardarTodo','hola');
    this.$emit('guardarTodo');

  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(){
    router.push('/barmenu/inicio')
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
  ValidarItem(){
    this.$emit('validarView');
    if(Global.nameComponent==='visualizar-proveedor'){
      this.$emit('visualizarProveedor',Global.nameComponent);
    }
    if(Global.nameComponent==='view-hes'){
      this.$emit('checkViewHES',Global.nameComponent);
    }
    if(Global.nameComponent==='aprobar-hes'){
      this.$emit('validarHes',Global.nameComponent);
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
