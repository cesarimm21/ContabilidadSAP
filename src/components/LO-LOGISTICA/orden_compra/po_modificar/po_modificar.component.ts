import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { RequisicionModel } from '@/modelo/maestro/requisicion';
import { RequisicionDetalleModel } from '@/modelo/maestro/requisiciondetalle';
import { ProveedorModel } from '@/modelo/maestro/proveedor';
import { MonedaModel } from '@/modelo/maestro/moneda';
import { AlmacenModel } from '@/modelo/maestro/almacen';
import { OrdenCompraModel } from '@/modelo/maestro/ordencompra';
import { OrdenCompraDetalleModel } from '@/modelo/maestro/ordencompradetalle';
import ordenCompraService from '@/components/service/ordencompra.service';
import requisicionService from '@/components/service/requisicion.service';
import proveedorService from '@/components/service/proveedor.service';
import almacenService from '@/components/service/almacen.service';
import impuestoService from '@/components/service/impuesto.service';
import BMonedaComponent from '@/components/buscadores/b_moneda/b_moneda.vue';
import BImpuestoComponent from '@/components/buscadores/b_impuesto/b_impuesto.vue';
import BPrioridadComponent from '@/components/buscadores/b_prioridad/b_prioridad.vue';
import { CompaniaModel } from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
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
export default class ModificarPOComponent extends Vue {
    nameComponent: string = 'modificar-po';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    textTitle:string;
    codigoCompania:any;
    descripcionCompania:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
    valuem:number=0;
    intlineaselect:number=-1;
    textosave:string='';
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    pagina: number =1;
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
        Global.nameComponent = 'modificar-po';           
        setTimeout(() => {
            this.loadPO();
        }, 200)
    }
   loadPO(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.textTitle='Modificar'
    ordencompraService.GetOrdenCompraCompany(this.codigoCompania)
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
      if(this.opSelect.strPO_NO!=undefined && this.opSelect.intIdPOH_ID!=undefined){
          // this.vifprogress=true;
          // this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            debugger;
            if(this.opSelect.strPO_NO!=undefined && this.opSelect.intIdPOH_ID!=undefined){
              router.push({ path: `/barmenu/LO-LOGISTICA/orden_compra/po_viewandedit`, query: { vista:this.textTitle ,data:JSON.stringify(this.opSelect) }  })
            }
          }, 600)
        }
        else{
          // this.vifprogress=false;
          this.textosave='Seleccione la Orden Compra. ';
          this.warningMessage('Seleccione la Orden Compra. ');
        }
      }
      validad(){
        // alert(this.opSelect.strPO_NO)
        if(this.opSelect.strPO_NO!=undefined){
          ordenCompraService.getPOONE(this.opSelect.strPO_NO)
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
        this.OrdenCompra = this.OrdenCompra1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.OrdenCompra[this.intlineaselect]);    
        this.blnilterstrPO_NO=false;
        this.blnilterstrRequis_NO=false;
        this.blnilterstrPO_Desc=false;
        this.blnilterstrVendor_Desc=false;
        this.blnilterdtmProcess_Date=false;
        this.blnilterfltTotal_Val=false;
        this.OrdenCompra2=this.OrdenCompra1;
        this.OrdenCompra = this.OrdenCompra2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
      }
      Buscar(){
        debugger;
        if(this.Column!=""){
          this.dialogBusquedaFilter=true;
          this.txtbuscar='';
        }
        else{
          this.$message('Seleccione columna')
        }
      }
      async AscItem(){
        debugger;
        let loading = Loading.service({
          fullscreen: true,
          text: 'Cargando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
        );
        console.log("asc",this.clickColumn)
        var data=await this.sortByKeyAsc(this.OrdenCompra1,this.clickColumn) 
        this.OrdenCompra2=[];
        this.OrdenCompra2=data;
        this.OrdenCompra = await this.OrdenCompra2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.OrdenCompra1,this.clickColumn) 
        this.OrdenCompra2=[];
        this.OrdenCompra2=data;
        this.OrdenCompra = this.OrdenCompra2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      btnBuscar(){
        var data=this.like(this.OrdenCompra1,this.clickColumn,this.txtbuscar)
        this.OrdenCompra=[];
        this.OrdenCompra=data;
        this.dialogBusquedaFilter=false;
      }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.OrdenCompra = this.OrdenCompra1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.OrdenCompra = this.OrdenCompra1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      EliminarItem(){

      }
      like(array, key,keyword) {
    
        var responsearr:any = []
        for(var i=0;i<array.length;i++) {
            if(array[i][key].toString().indexOf(keyword) > -1 ) {
              responsearr.push(array[i])
          }
        }
        return responsearr
      }
      sortByKeyDesc(array, key) {
        return array.sort(function (a, b) {
            var x = a[key]; var y = b[key];
            if(x === "" || y === null) return 1;
            if(x === "" || y === null) return -1;
            if(x === y) return 0;
              return ((x > y) ? -1 : ((x < y) ? 1 : 0));
           
        });
      }
      sortByKeyAsc(array, key) {
        return array.sort(function (a, b) {
            debugger;
            var x = a[key]; var y = b[key];
            if(x === "" || y === null) return 1;
            if(x === "" || y === null) return -1;
            if(x === y) return 0;
             return ((x < y) ? -1 : ((x > y) ? 1 : 0));
            
        });
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
            nameComponent: 'crear-po',
            textTitle:'',
            OrdenCompra:[],
            OrdenCompra1:[],
            OrdenCompra2:[],
            codigoCompania:'',
            descripcionCompania:''
        }
    }
}