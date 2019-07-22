import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {CategoriaCentroCostoModel} from '@/modelo/maestro/categoriacentrocosto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
import categoriacentrocostoService from '@/components/service/categoriacentrocosto.service';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
@Component({
  name: 'view-categoria-centro-costo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class ViewAndEditCategoriaCentroCostoComponent extends Vue {
     nameComponent:string;
    fecha_actual:string;
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
 
    fecha_ejecucion:string;
    companyName:any;
    companyCod:any;
    issave:boolean=false;
    iserror:boolean=false;
    textosave:string='';
    public categoria:CategoriaCentroCostoModel=new CategoriaCentroCostoModel();
    public tableData:Array<CategoriaCentroCostoModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    selectrow:any;
    currentRow:any;
    dialogEliminar:boolean=false;
    codigo:string='';
    item:string='';
    dialogInactivar:boolean=false;
    
  constructor(){    
        super();
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.cargarList();
    }
    
    handleCurrentChange(val) {
        debugger;
        if(val!=null){
        this.selectrow=val;
        this.currentRow = val;
        }
    }
    async cargarList(){
        debugger;
        if(this.codigo!=''){
            await categoriacentrocostoService.GetOnlyOneCategoriaCentroCosto(this.codigo)
            .then(res=>{
                debugger;
                console.log('/****************Busqueda***************/')
                console.log(res)
                if(res!=undefined){
                    this.selectrow=res;
                    this.validarView();
                }
            })
            .catch(error=>{
            
            })
        }
        else{
            await categoriacentrocostoService.GetAllCategoria()
            .then(res=>{
                debugger;
                console.log('/****************Busqueda***************/')
                console.log(res)
                this.tableData=res;
            })
            .catch(error=>{
            
            })
        }
    }
    async validarView(){
        debugger;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdInvStock_ID!=-1){
            debugger;
            if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.strAcc_Local_NO!=''){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/categoria_centro_costo/modif_categoria_centro_costo`, query: { vista: 'modificar',data:JSON.stringify(this.selectrow) }  })
            }
        }
        else{
            this.textosave='Seleccione alguna salida. ';
        }
    }
    fnOcultar(){

    }
    handleChange(value) {
        console.log(value);
    }

    
  EliminarItem(){
    if(this.selectrow!=undefined){
      this.dialogEliminar=true;
    }
    else{
      alert('Debe de seleccionar una fila!!!');
    }
  }
  async btnEliminar(){
    await categoriacentrocostoService.EliminarCategoriaCentroCosto(this.selectrow)
    .then(response=>{
      debugger;
      console.log('eliminar',response);
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response.strCCCategory_Cod;
         this.issave=true;
         this.iserror=false;
      }
      else{
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      }
      this.cargarList();
      this.dialogEliminar=false;
      //this.unidadmedidaModel=response;       
    }).catch(error=>{
      
      this.dialogEliminar=false;
      this.issave=false;
      this.iserror=true;
      this.textosave='Ocurrio un error al eliminar.';
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo eliminar'
      });
    })
    
  }
  getDateStringView(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
    var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
    var yyyy = dateString.getFullYear();
    var dd = (dia<10) ? '0'+dia : dd=dia;
    var mm = (mes<10) ? '0'+mes : mm=mes;
    return dd+'.'+mm+'.'+yyyy;
}


ActivarDesactivar(){
    debugger;
    this.item=this.selectrow.strCCGrpProc_Cod;
    this.dialogInactivar=true;      
  }
  
  successMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  errorMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'error'
    });
  }
  async btnInactivar(){
    var nameuser:any=localStorage.getItem('User_Usuario');
    this.selectrow.strModified_User=nameuser;
    if(this.selectrow.strCCGrpProc_Cod!=""){
      
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );   
      await categoriacentrocostoService.ActivarCategoriaCentroCosto(this.selectrow)
      .then(respo=>{
        loadingInstance.close();
        this.successMessage('Se Activo Categoria Centro Costo '+this.selectrow.strCCCategory_Cod)
        this.load();
        this.issave=true;
        this.iserror=false;
        this.textosave='Se Activo Categoria Centro Costo'+this.selectrow.strCCCategory_Cod;
        this.dialogInactivar=false;
      }).catch(ee=>{
        loadingInstance.close();
        this.issave=false;
        this.iserror=true;
        this.textosave='Error en Activar '+this.selectrow.strCCCategory_Cod;
        this.errorMessage('Error en Activar '+this.selectrow.strCCCategory_Cod)})
        this.dialogInactivar=false;
    }
    else{
      this.warningMessage('Debe de seleccionar una fila!!!');
    }
  }
  
  warningMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'warning'
    });
  }


    data(){
        return{     
            companyName:'',
            companyCod:'',
            namepage:''
        }
    }
  
}
