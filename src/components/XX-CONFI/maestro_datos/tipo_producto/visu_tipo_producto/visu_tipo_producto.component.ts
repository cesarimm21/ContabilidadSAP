import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
//***Modelos */
import {TipoRequisicionModel} from '@/modelo/maestro/tipoRequisicion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import impuestoService from '@/components/service/impuesto.service';
import tipoproductoService from '@/components/service/tipoRequisicion.service';


import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';

@Component({
  name: 'viewandedit-tipo-producto',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions':ButtonsAccionsComponent,
  }
})
export default class ViewAndEditTipoProductoComponent extends Vue {
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
    public tipoproducto:TipoRequisicionModel=new TipoRequisicionModel();
    public tableData:Array<TipoRequisicionModel>=[]; 
    namepage:string;
    impDisabled:boolean=false;
    cod_criticidad:string='';
    selectrow:any;
    currentRow:any;
    dialogEliminar:boolean=false;
    cod_tipo_producto:string='';
  constructor(){    
        super();
        Global.nameComponent='viewandedit-tipo-producto';
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
        if(this.cod_tipo_producto!=''){
            await tipoproductoService.GetOnlyOneTipoRequisicion(this.cod_tipo_producto)
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
            await tipoproductoService.GetAllTipoRequisicion2()
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
        if(this.selectrow!=undefined && this.selectrow!=null ){
            debugger;
            if(this.selectrow!=undefined && this.selectrow!=null ){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_producto/modif_tipo_producto`, query: { vista: 'visualizar',data:JSON.stringify(this.selectrow) }  })
            }
        }
        else{
            this.textosave='Seleccione algun item. ';
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
    await tipoproductoService.EliminarTipoRequisicion(this.currentRow)
    .then(response=>{
      debugger;
      console.log('eliminar',response);
      if(response!=undefined){
         this.textosave='Se elimino correctamento.' + response.strTypeReq_Cod;
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
    data(){
        return{     
            companyName:'',
            companyCod:'',
            namepage:''
        }
    }
  
}
