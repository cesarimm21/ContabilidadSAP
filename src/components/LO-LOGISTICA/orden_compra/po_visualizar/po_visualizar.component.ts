import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import { OrdenCompraDetalleModel } from '@/modelo/maestro/ordencompradetalle';
import ordenCompraService from '@/components/service/ordencompra.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
import ordencompraService from '@/components/service/ordencompra.service';
@Component({
    name: 'modificar-po',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class VisualizarPOComponent extends Vue {
    nameComponent: string = 'modificar-po';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    textTitle:string;
    codigoCompania:any;
    descripcionCompania:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
    valuem:number=0;
    textosave:string='';
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    pagina: number =1;
    strPO_NO:string;
    RegistersForPage: number = 100;
    totalRegistros: number = 100;
    vifprogress:boolean=false;
    issave:boolean=false;
    iserror:boolean=false;
    blnilterstrPO_NO:boolean=false;
    blnilterstrRequis_NO:boolean=false;
    blnilterstrPO_Desc:boolean=false;
    blnilterstrVendor_Desc:boolean=false;
    blnilterdtmProcess_Date:boolean=false;
    blnilterfltTotal_Val:boolean=false;
    dialogBusquedaFilter:boolean=false;
    //**[ORDEN COMPRA] */
    public OrdenCompra: Array<OrdenCompraModel>;
    public OrdenCompra1: Array<OrdenCompraModel>;
    public OrdenCompra2: Array<OrdenCompraModel>;
    public opSelect: OrdenCompraModel=new OrdenCompraModel();
    constructor() {
        super();
        Global.nameComponent = 'visualizar-po';           
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
   loadPO(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.textTitle='Visualizar'
    ordencompraService.GetOCView(this.codigoCompania)
    .then(resp=>{
      this.OrdenCompra=[];
      this.OrdenCompra1=[];
      this.OrdenCompra2=[];
      this.OrdenCompra=resp;
      this.OrdenCompra1=resp;
      this.OrdenCompra2=resp;
    })
   }
   handleCurrentChange(val:OrdenCompraModel){
    this.opSelect=val;   
    this.strPO_NO=this.opSelect.strPO_NO;
    this.textosave='Orden Compra '+this.opSelect.strPO_NO; 
   }
   getDateString(fecha:string){
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
    async validarView(){
      if(this.opSelect.strPO_NO!='' && this.opSelect.intIdPOH_ID!=-1){
          // this.vifprogress=true;
          // this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            debugger;
            if(this.opSelect.strPO_NO!='' && this.opSelect.intIdPOH_ID!=-1){
              router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_viewandedit`, query: { vista:this.textTitle ,data:JSON.stringify(this.opSelect) }  })
            }
          }, 600)
        }
        else{
          // this.vifprogress=false;
          this.textosave='Seleccione la Impuesto. ';
          this.warningMessage('Seleccione la Impuesto. ');
        }
      }
      validad(){
        if(this.strPO_NO!=""){
          ordenCompraService.getPOONEview(this.strPO_NO)
          .then(respo=>{
            this.opSelect=respo;            
            if(this.opSelect.strPO_NO!=undefined){
              router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_viewandedit`, query: { vista:this.textTitle ,data:JSON.stringify(this.opSelect) }  })
            }     
            else{
              this.warningMessage('No existe Orden Compra');
            }      
          })
          .catch(error=>{
            this.warningMessage('No existe Orden Compra');
          })          
        }
        else{
          this.warningMessage('Inserte Orden Compra');
        }
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
      Limpiar(){
        this.OrdenCompra=[];
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
        this.OrdenCompra = this.OrdenCompra1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
      Buscar(){
        if(this.Column!=""){
          this.dialogBusquedaFilter=true;
          this.txtbuscar='';
        }
        else{
          this.$message('Seleccione columna')
        }
      }
      btnBuscar(){    
        var data=Global.like(this.OrdenCompra1,this.clickColumn,this.txtbuscar)
        this.OrdenCompra=[];
        this.OrdenCompra=data;
        this.dialogBusquedaFilter=false;
      }
    headerclick(val){    
        this.Column=val.label;
        Global.setColumna(this.Column);
        if(val.property=="strPO_NO"){
            this.clickColumn="strPO_NO";
            this.blnilterstrPO_NO=true;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strRequis_NO"){
            this.clickColumn="strRequis_NO";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=true;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strPO_Desc"){
            this.clickColumn="strPO_Desc";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=true;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="strVendor_Desc"){
            this.clickColumn="strVendor_Desc";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=true;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="dtmProcess_Date"){
            this.clickColumn="dtmProcess_Date";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=true;
            this.blnilterfltTotal_Val=false;
        }
        if(val.property=="fltTotal_Val"){
            this.clickColumn="fltTotal_Val";
            this.blnilterstrPO_NO=false;
            this.blnilterstrRequis_NO=false;
            this.blnilterstrPO_Desc=false;
            this.blnilterstrVendor_Desc=false;
            this.blnilterdtmProcess_Date=false;
            this.blnilterfltTotal_Val=true;
        }
    }
    filterstrPO_NO(h,{column,$index}){
        if(this.blnilterstrPO_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrRequis_NO(h,{column,$index}){        
        if(this.blnilterstrRequis_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrPO_Desc(h,{column,$index}){        
        if(this.blnilterstrPO_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrVendor_Desc(h,{column,$index}){
        if(this.blnilterstrVendor_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmProcess_Date(h,{column,$index}){        
        if(this.blnilterdtmProcess_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterfltTotal_Val(h,{column,$index}){        
        if(this.blnilterfltTotal_Val){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
      guardarTodo(){
        this.$message({
          showClose: true,
          message: 'Accion no permitida',
          type: 'warning'
        });
      }
    data() {
        return {
            nameComponent: 'visualizar-po',
            textTitle:'',
            OrdenCompra:[],
            OrdenCompra1:[],
            OrdenCompra2:[],
            codigoCompania:'',
            descripcionCompania:'',
            strPO_NO:''
        }
    }
}