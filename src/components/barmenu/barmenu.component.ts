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
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import HeaderbuttosComponent from '@/components/headerbuttos/headerbuttos.vue'
import { Notification } from 'element-ui';
import { AccesoModel } from  'src/modelo/login/acceso';
import GLOBAL from '../../Global';
import Global from '../../Global';
@Component({
   name: 'barmenu',
   components:{
     'top-menu':TopMenu,
     'inicio':InicioComponent,
     'quickaccessmenu':QuickAccessMenuComponent,
     'buttons-accions':ButtonsAccionsComponent
   }
})
export default class BarmenuComponent extends Vue {
  isActive:boolean;
  isCollapse:boolean;
  accesosBarMenu:any=[];
  
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  UserData:any;
  dimensionContent = 21;
  gridData:any;
  modelAcceso:AccesoModel[];
  tableData:any[];
  constructor(){
    super()    
    this.isActive=GLOBAL.isActive;
    this.isCollapse=GLOBAL.isCollapse;
    this.getAccesos(); 
  }
  proveedorSeleccionado(val){
    debugger;
    this.isActive=GLOBAL.getActive()
    this.isCollapse=GLOBAL.getCollapse()
    // this.FormSearch.SUPPLIER_NO = val.SUPPLIER_NO;
    // //this.formularioBusqueda.proveedorSeleccionado=val.id_articulo;
    // this.busquedaProveedorVista=false;
  }

  getAccesos(){
    // console.log(this.tableData);
      // for (var j=0; j< this.tableData.length; j++){
      //   if(this.tableData[j].intLevel == 1){
      //     this.accesosBarMenu.push({
      //       strNombre: this.tableData[j].strName,
      //       intIndex:this.tableData[j].strIndex,
      //       strClickName:this.tableData[j].strClick_Name,
      //       strIconName:this.tableData[j].strIcon_Name,
      //       strEnlace:this.tableData[j].strLink
      //     });
      //   }
      // }
    // var test=localStorage.getItem('User_Cargo');
    // UsuarioService.GetUsuarioAccesos()
    // .then(response => {  
    //   console.log(response);
      
      
          
    //   for (var j=0; j< response.Data.length; j++){
    //     if(response.Data[j].intLevel == 1){
    //       this.accesosBarMenu.push({
    //         strNombre: response.Data[j].strName,
    //         intIndex:response.Data[j].strIndex,
    //         strClickName:response.Data[j].strClick_Name,
    //         strIconName:response.Data[j].strIcon_Name,
    //         strEnlace:response.Data[j].strLink
    //       });
    //     }
    //   }
    // })
    // .catch(e =>{
    //   console.log(e);
    //   if(e.response.status === 401){ // token no valido
    //     this.redirectLogin(e.response.statusText+', Vuelva a Iniciar Sesion');
    //   }
    //   else{
    //     this.openMessageError('Error al cargar accesos barmenu');
    //   }
    // })
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
  linkRouteCrear(){
    debugger;
    router.push('/barmenu/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante')
  }
  linkRouteModificar(){
    debugger;
    router.push('/barmenu/FI-FINANZAS/ingreso-comprobante/modificar-ingreso-comprobante')
  }
  linkRoute(){
    router.push('/barmenu/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante')
  }
  linkRouterunpagos(){
    router.push('/barmenu/run')
  }
  linkCrearProveedor(){
    router.push('/barmenu/FI-FINANZAS/proveedor/crear-proveedor')
  }
  linkModificarProveedor(){
    router.push('/barmenu/FI-FINANZAS/proveedor/modificar-proveedor')
  }
  linkVisualizarProveedor(){
    router.push('/barmenu/FI-FINANZAS/proveedor/visualizar-proveedor')
  }
  linkCrearRequisicion(){
    router.push('/barmenu/LO-LOGISTICA/requisicion/pr_crear')
  }
  linkCrearSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_salida')
  }
  linkRouteHes(val:string){
    if(val==='crear'){
      return router.push('/barmenu/LO-LOGISTICA/HES/crear-hes');
    }
    if(val==='edit'){
      return router.push('/barmenu/LO-LOGISTICA/HES/edit-hes');
    }
    if(val==='view'){
      return router.push('/barmenu/LO-LOGISTICA/HES/view-hes');
    }
    
  }
  linkCrearMaterial(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_crear')
  }
  linkModificarHes(){

  }
  linkVisualizarHes(){

  }
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    }

    handleClose (key, keyPath) {
      // console.log(key, keyPath)
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
    linkModificarRequisicion(){
      router.push('/barmenu/LO-LOGISTICA/requisicion/pr_modificar')
    }
    linkVisualizarRequisicion(){
      router.push('/barmenu/LO-LOGISTICA/requisicion/pr_visualizar')
    }
    linkVisualizarModificaRequisicion(){
      router.push('/barmenu/LO-LOGISTICA/requisicion/pr_visualizar_modificar')
    }
  data() {
    return {
      accesosUser: [],
      tableData: [
        {        
        intAccess_ID: '1',
        strName: 'FI-FINANZAS',
        strDescription: 'finanzas',
        strLink: '/barmenu/finanzas',
        intLevel: '1',
        intLevel2: '0',
        strIndex: '1',
        intFather: '1',
        strClick_Name: 'funcion',
        strIcon_Name: 'fa fa-user',
        strUser_ID: '10000'
      },
        {        
        intAccess_ID: '1',
        strName: 'LO-LOGISTICA',
        strDescription: 'finanzas',
        strLink: '/barmenu/finanzas',
        intLevel: '1',
        intLevel2: '0',
        strIndex: '1',
        intFather: '1',
        strClick_Name: 'funcion',
        strIcon_Name: 'fa fa-user',
        strUser_ID: '10000'
      },
        {        
        intAccess_ID: '1',
        strName: 'CP-COSTOS Y PRESUPUESTOS',
        strDescription: 'finanzas',
        strLink: '/barmenu/finanzas',
        intLevel: '1',
        intLevel2: '0',
        strIndex: '1',
        intFather: '1',
        strClick_Name: 'funcion',
        strIcon_Name: 'fa fa-user',
        strUser_ID: '10000'
      },
        {        
        intAccess_ID: '1',
        strName: 'CO-COMERCIAL',
        strDescription: 'finanzas',
        strLink: '/barmenu/finanzas',
        intLevel: '1',
        intLevel2: '0',
        strIndex: '1',
        intFather: '1',
        strClick_Name: 'funcion',
        strIcon_Name: 'fa fa-user',
        strUser_ID: '10000'
      },
        {        
        intAccess_ID: '1',
        strName: 'XX-CONFIGURACIÓN',
        strDescription: 'finanzas',
        strLink: '/barmenu/finanzas',
        intLevel: '1',
        intLevel2: '0',
        strIndex: '1',
        intFather: '1',
        strClick_Name: 'funcion',
        strIcon_Name: 'fa fa-user',
        strUser_ID: '10000'
      },
    ]
    }
  }
}
