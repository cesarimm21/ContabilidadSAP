import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TopMenu from '../customs/top-menu/TopMenu.vue';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import InfiniteScroll from 'vue-infinite-scroll';
import Inicio from '@/components/inicio/inicio.vue';
import DocComparador from '@components/docComparador/docComparador.vue'
import DocNuevo from '@components/docNuevo/docNuevo.vue'
import Jerarquia from '@components/jerarquia/jerarquia.vue'
import PopUpOpcion from '@components/popUpOpcion/popUpOpcion.vue';
import UsuarioService from '@/components/service/usuario.service';
import '../../assets/css/barmenu.scss';
import UsuarioComponent from '@/components/usuario/usuario.component';
import InicioComponent from '@/components/inicio/inicio.component';
import { Notification } from 'element-ui';
@Component({
   name: 'barmenu',
   components:{
     'top-menu':TopMenu,
     'inicio':InicioComponent
   }
})
export default class BarmenuComponent extends Vue {
  isActive:boolean;
  isCollapse:boolean;
  accesosBarMenu:any=[];
  UserData:any;
  gridData:any;
  constructor(){
    super()    
    this.isActive=true;
    this.isCollapse=false;
    this.getAccesos();
  }
  getAccesos(){
    var test=localStorage.getItem('User_Cargo');
    UsuarioService.GetUsuarioAccesos(test)
    .then(response => {      
      for (var j=0; j< response.Data.length; j++){
        if(response.Data[j].intNivel == 1){
          this.accesosBarMenu.push({
            strNombre: response.Data[j].strNombre,
            intIndex:response.Data[j].intIndex,
            strClickName:response.Data[j].strClickName,
            strIconName:response.Data[j].strIconName,
            strEnlace:response.Data[j].strEnlace
          });
        }
      }
    })
    .catch(e =>{
      console.log(e);
      if(e.response.status === 401){ // token no valido
        this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
      }
      else{
        this.openMessageError('Error al cargar accesos barmenu');
      }
    })
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
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    // router.push('/')
  }
  linkRoute(route){
    router.push(route)
  }
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    }

    handleClose (key, keyPath) {
      console.log(key, keyPath)
    }
    clickHamburger () {
      this.isActive = !this.isActive
      this.isCollapse = !this.isCollapse
    }
    links(){
        router.push('/barmenu/docNuevo')
    }
    linksAprovado(){
      router.push('/barmenu/docAprobado')
    }
    linksRechazado(){
      router.push('/barmenu/docRechazado')
    }
    linksEliminado(){
      router.push('/barmenu/docEliminado')
    }
    linksVersiones(){
      router.push('/barmenu/versiones')
    }
    linksPermission(){
      router.push('/barmenu/permission')
    }
    linksComparador(){
      router.push('/barmenu/docComparador')
    }
    links2(){
      router.push('/barmenu/inicio')
  }
  data() {
    return {
      accesosUser: []
    }
  }
}
