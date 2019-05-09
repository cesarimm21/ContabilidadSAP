import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import facturaService from '@/components/service/factura.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { FacturaModel } from '@/modelo/maestro/factura';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'modificar-ic',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class ModificarICComponent extends Vue {
    nameComponent: string = 'modificar-ic';
    sizeScreen: string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth: string = (window.innerWidth - 288).toString();//'0';
    textTitle:string;
    companyName:any;
    companyCod:any;
    options = {  day: '2-digit',month: '2-digit', year: 'numeric' };
    intlineaselect:number=-1;
    pagina: number =1;
    RegistersForPage: number = 10;
    totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    blnilterstrVoucher_NO:boolean=false;
    blnilterstrSerie_Doc:boolean=false;
    blnilterstrDocument_NO:boolean=false;
    blnilterstrPO_NO:boolean=false;
    blnilterstrDesc_Doc:boolean=false;
    blnilterdtmDoc_Date:boolean=false;
    blnilterstrVendor_Desc:boolean=false;
    dialogBusquedaFilter:boolean=false;
    public Factura:FacturaModel=new FacturaModel();
    gridFactura:FacturaModel[];
    gridFactura1:FacturaModel[];
    gridFactura2:FacturaModel[];
    currentRow:any;
    vifprogress:boolean=true;
    valuem:number=0;
    textosave:string='';
    constructor() {
        super();
        Global.nameComponent = 'modificar-ic';  
        setTimeout(() => {
            this.load();
        }, 200)
    }
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.textTitle='Modificar Impuesto';
        this.loadImpuesto();
    }
    loadImpuesto(){
        facturaService.GetFacturaAll(this.companyCod)
        .then(resp=>{
            this.gridFactura=[];
            this.gridFactura1=[];
            this.gridFactura2=[];
            this.gridFactura=resp;
            this.gridFactura1=resp;
            this.gridFactura2=resp;
        })
    }
   handleCurrentChange(val:FacturaModel){
    this.Factura=val;
   }
   getDateString(fecha:string){
    var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    return dateString;
    }
    confirmaraceptar(){
      }
      btnBuscar(){
        var data=this.like(this.gridFactura1,this.clickColumn,this.txtbuscar)
        this.gridFactura=[];
        this.gridFactura=data;
        this.dialogBusquedaFilter=false;
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
        var data=await this.sortByKeyAsc(this.gridFactura1,this.clickColumn) 
        this.gridFactura2=[];
        this.gridFactura2=data;
        this.gridFactura = await this.gridFactura2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.gridFactura1,this.clickColumn) 
        this.gridFactura2=[];
        this.gridFactura2=data;
        this.gridFactura = this.gridFactura2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      Limpiar(){
        this.gridFactura = this.gridFactura1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.gridFactura[this.intlineaselect]);    
        this.blnilterstrVoucher_NO=false;
        this.blnilterstrSerie_Doc=false;
        this.blnilterstrDocument_NO=false;
        this.blnilterstrPO_NO=false;
        this.blnilterstrDesc_Doc=false;
        this.blnilterdtmDoc_Date=false;
        this.blnilterstrVendor_Desc=false;
        this.gridFactura2=this.gridFactura1;
        this.gridFactura = this.gridFactura2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
      }
      Print(){
        window.print();
      }
    async  EliminarItem(){
        // if(this.Factura.strWH_Cod!=''){
        //     this.vifprogress=true;
        //     this.valuem=0;
        //     await setTimeout(() => {
        //       for(var i=0;i<100;i++){
        //         this.valuem++; 
        //       }
        //     }, 200)
        //     await setTimeout(() => {
        //         debugger;
        //         if(this.Impuesto.strWH_Cod!=''&& this.Impuesto.intIdWH_ID!=-1){
        //           impuestoService.DeleteImpuesto(this.Impuesto.intIdWH_ID,'egaona')
        //           .then(resp=>{
        //             this.$message({
        //                 showClose: true,
        //                 message: 'Se elimino correctamente',
        //                 type: 'success'
        //               });
        //               this.Impuesto=new ImpuestoModel();
        //               this.loadImpuesto();
        //           })
        //           .catch(error=>{
        //             this.$message({
        //                 showClose: true,
        //                 message: 'No se eliminó',
        //                 type: 'error'
        //               });
        //           })
        //         }
        //       }, 600)
        // }
        // else{
        //     this.vifprogress=false;
        //     this.textosave='Error eliminar impuesto. ';
        //     this.warningMessage('Error eliminar impuesto. ');
        // }
    }
    async validad(){
        
        if(this.Factura.strVoucher_NO!=''){
            this.vifprogress=true;
            this.valuem=0;
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
              debugger;
              if(this.Factura.strVoucher_NO!=''){
                router.push({ path: `/barmenu/FI-FINANZAS/ingreso-comprobante/viewandedit_ic`, query: { vista:'Modificar' ,data:JSON.stringify(this.Factura) }  })
              }
            }, 600)
          }
          else{
            this.vifprogress=false;
            this.textosave='voucher no existe. ';
            this.warningMessage('voucher no existe. ');
          }
        }
     async validarView(){
        if(this.Factura.strVoucher_NO!=''){
            this.vifprogress=true;
            this.valuem=0;
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
              debugger;
              if(this.Factura.strVoucher_NO!=''){
                router.push({ path: `/barmenu/FI-FINANZAS/ingreso-comprobante/viewandedit_ic`, query: { vista:'Modificar' ,data:JSON.stringify(this.Factura) }  })
              }
            }, 600)
          }
          else{
            this.vifprogress=false;
            this.textosave='Seleccione la ingreso comprobante. ';
            this.warningMessage('Seleccione la ingreso comprobante. ');
          }
        }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.gridFactura = this.gridFactura1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.gridFactura = this.gridFactura1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
    //#region [CABECERA]
    headerclick(val){    
        this.Column=val.label;
        Global.setColumna(this.Column);
        if(val.property=="strVoucher_NO"){
            this.clickColumn="strVoucher_NO";
            this.blnilterstrVoucher_NO=true;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="strSerie_Doc"){
            this.clickColumn="strSerie_Doc";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=true; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="strDocument_NO"){
            this.clickColumn="strDocument_NO";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=true;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="strPO_NO"){
            this.clickColumn="strPO_NO";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=true;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="strDesc_Doc"){
            this.clickColumn="strDesc_Doc";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=true;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="dtmDoc_Date"){
            this.clickColumn="dtmDoc_Date";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=true;
            this.blnilterstrVendor_Desc=false;
        }
        if(val.property=="strVendor_Desc"){
            this.clickColumn="strVendor_Desc";
            this.blnilterstrVoucher_NO=false;
            this.blnilterstrSerie_Doc=false; 
            this.blnilterstrDocument_NO=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrDesc_Doc=false;
            this.blnilterdtmDoc_Date=false;
            this.blnilterstrVendor_Desc=true;
        }
        
    }
    filterstrVoucher_NO(h,{column,$index}){
        if(this.blnilterstrVoucher_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrSerie_Doc(h,{column,$index}){        
        if(this.blnilterstrSerie_Doc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrDocument_NO(h,{column,$index}){
        
        if(this.blnilterstrDocument_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
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
      filterstrDesc_Doc(h,{column,$index}){
        
        if(this.blnilterstrDesc_Doc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filtersdtmDoc_Date(h,{column,$index}){
        
        if(this.blnilterdtmDoc_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filtersstrVendor_Desc(h,{column,$index}){
        
        if(this.blnilterstrVendor_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      
      //#endregion
    backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    data() {
        return {
            nameComponent: 'crear-po',
            textTitle:'',
            gridFactura:[],
            gridFactura1:[],
            gridFactura2:[],
            companyCod:'',
            companyName:''
        }
    }
}