import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import TopMenu from '../customs/top-menu/TopMenu.vue';
import router from '../../router';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import '../../assets/css/barmenu.scss';
import InicioComponent from '@/components/inicio/inicio.component';
import { Notification } from 'element-ui';
import { AccesoModel } from  'src/modelo/login/acceso';
import AccesoService from '@/components/service/accesos.service';
import GLOBAL from '../../Global';
import { API_URL } from '@/Config';
@Component({
   name: 'barmenu',
   components:{
     'top-menu':TopMenu,
     'inicio':InicioComponent,
   }
})
export default class BarmenuComponent extends Vue {
  isActive:boolean;
  isCollapse:boolean;
  accesosBarMenu:any=[];
  
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  UserData:any;
  imagenLast:string;
  dimensionContent = 21;
  gridData:any;
  modelAcceso:AccesoModel[];
  childrenItem1:AccesoModel=new AccesoModel();
  childrenItem2:AccesoModel=new AccesoModel();
  childrenItem3:AccesoModel=new AccesoModel();

  dataRoute:AccesoModel=new AccesoModel();
  tableData:AccesoModel[];
  constructor(){
    super()    
    this.imagenLast="../../images/sheet.png";
    GLOBAL.routeInicio=document.URL
    this.isActive=GLOBAL.isActive;
    this.isCollapse=GLOBAL.isCollapse;
    this.getAccesos(); 
  }
  proveedorSeleccionado(val){
    debugger;
    this.isActive=GLOBAL.getActive()
    this.isCollapse=GLOBAL.getCollapse()
  }

  getAccesos(){
    AccesoService.GetAllAccesos()
    .then(response=>{
      this.modelAcceso=[];
      this.modelAcceso=response;    
      for (var j=0; j< this.modelAcceso.length; j++){
        if(this.modelAcceso[j].intLevel === 0){ 
           this.childrenItem1=this.modelAcceso[j]; 
           this.childrenItem1.childLevel1=[];
          for(var i=0; i< this.modelAcceso.length; i++){
            if(this.modelAcceso[i].intFather===this.modelAcceso[j].intIdRolAcc_ID){
                this.childrenItem2=this.modelAcceso[i]
                this.childrenItem2.childLevel1=[];
                for(var k=0; k< this.modelAcceso.length; k++){
                  if(this.modelAcceso[k].intFather===response[i].intIdRolAcc_ID){
                    this.childrenItem3=this.modelAcceso[k];
                    this.childrenItem3.childLevel1=[];
                    for(var l=0; l< this.modelAcceso.length; l++){
                      if(this.modelAcceso[l].intFather===response[k].intIdRolAcc_ID){
                        this.childrenItem3.childLevel1.push(this.modelAcceso[l]);
                      }                      
                    }
                    this.childrenItem2.childLevel1.push(this.childrenItem3);
                  }
                }
                this.childrenItem1.childLevel1.push(this.childrenItem2);
              }
            }             
          this.tableData.push(this.childrenItem1);
          } 
        }        
    })
  }
  getLink(code){
    AccesoService.getRoute(code)
    .then(res=>{
      this.dataRoute=res;
      if(this.dataRoute.strLink==undefined){
        this.openMessageAlert('No hay ruta');
      }
      else{
        var ruta:string=GLOBAL.routeLogin+this.dataRoute.strLink;
        window.open(ruta);
        // this.linkRoute(this.dataRoute.strLink);
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
  openMessageAlert(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'info'
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
  linkRouteVisualizar(){
    router.push('/barmenu/FI-FINANZAS/ingreso-comprobante/ver-ingreso-comprobante')
  }
  linkRoute(route){
    router.push(route)
  }
  // linkRoute(){
  //   router.push('/barmenu/FI-FINANZAS/ingreso-comprobante/crear-ingreso-comprobante')
  // }
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
  linkDespachoSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/salida/al_salidadespacho')
  }
  
  linkCrearEmpleado(){
    router.push('/barmenu/HR-Planilla/empleado/empleado_crear')
  }

  linkVisualizarModificarCuentaContable(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_modificar_cuenta_contable')
  }
  linkVisualizarModificarCentroCostos(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/centro-costos/visualizar_modificar_centro_costos')
  }
  
  linkVisualizarCuentaContable(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/visualizar_cuenta_contable')
  }
  linkVisualizarCentroCostos(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/centro-costos/visualizar_centro_costos')
  }  
  linkCuentaContable(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/contabilidad-general/crear-cuenta-contable');
  }
  linkCentroCostos(){
    router.push('/barmenu/FI-FINANZAS/maestro-datos/centro-costos/crear-centro-costos');
  }
  
  linkAprobarSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/salida/al_salidaaprobar')
  }
  linkRecepcionarSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_recepcion_bienes/al_recepcion_busqueda')
  }
  AprobarPO(){
    router.push('/barmenu/LO-LOGISTICA/orden_compra/po_aprobacion')
  }
  linkAprobarRequisicionAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/requisicion/pr_aprobador')
  }
  
  linkModificarSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_salida_visualizar_modificar')
  }
  linkVisualizarSalidaAlmacen(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_salida_visualizar')
  }
  CrearPO(){
    router.push('/barmenu/LO-LOGISTICA/orden_compra/po_crear')
  }
  EditPO(){
    router.push('/barmenu/LO-LOGISTICA/orden_compra/po_modificar')
  }
  ViewPO(){
    router.push('/barmenu/LO-LOGISTICA/orden_compra/po_visualizar')
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
    if(val==='aprobar'){
      return router.push('/barmenu/LO-LOGISTICA/HES/aprobar-hes');
    }
    
  }
  linkCrearMaterial(){
    router.push('/barmenu/LO-LOGISTICA/almacen/al_crear')
  }
  linkModificarMaterial(){
    debugger;
    GLOBAL.vmmaterial='Modificar Material';
    router.push('/barmenu/LO-LOGISTICA/almacen/al_visualizar_modificar')
  
  //  router.push({ path: `/barmenu/LO-LOGISTICA/almacen/al_visualizar_modificar`, query: { vista: 'modificar' }  })
     // router.push('/barmenu/LO-LOGISTICA/almacen/al_modificar')
  }
  linkVisualizarMaterialAlmacen(){
    debugger;
    GLOBAL.vmmaterial='Visualizar Material';
    //router.go(-3);
    router.replace({ path: `/barmenu/LO-LOGISTICA/almacen/al_visualizar`, query: { vista: 'visualizar' }  })
  }
  linkModificarHes(){

  }
  guardarTodo(val){
    debugger;
    alert(val)
  }
  linkVisualizarHes(){

  }
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    }
    handleOpen1 (key, keyPath) {
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
    
    linkLibroDiarioD(){
      router.push('/barmenu/FI-FINANZAS/libros-balance/librodiario')
    }
  data() {
    return {
      accesosUser: [],
      tableData:[],
      imagenLast:'',
    }
  }
}
