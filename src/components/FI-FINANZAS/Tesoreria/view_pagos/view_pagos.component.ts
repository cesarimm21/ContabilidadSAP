import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { PagosModel } from '@/modelo/maestro/pagos';
import runpagosService from '@/components/service/runpagos.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'view-run',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class VisualizarPagosComponent extends Vue {
    nameComponent: string = 'view-run';
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
    RegistersForPage: number = 10;
    totalRegistros: number = 100;
    vifprogress:boolean=false;
    issave:boolean=false;
    iserror:boolean=false;
    blnilterstrPayRun_NO:boolean=false;
    blnilterdtmPayRun_Date:boolean=false;
    blnilterstrPayRun_Curr:boolean=false;
    blnilterdtmPayRunPay_Date:boolean=false;
    blnilterdtmPayRunExpired_Date:boolean=false;
    blnilterstrBank_Name:boolean=false;
    blnilterstrPayRun_Account:boolean=false;
    dialogBusquedaFilter:boolean=false;
    //**[Pagos] */
    Pago: PagosModel[];
    Pago1: PagosModel[];
    Pago2: PagosModel[];
    public pagosSelect: PagosModel=new PagosModel();
    constructor() {
        super();
        Global.nameComponent = 'view-run';           
        setTimeout(() => {
            this.loadPagos();
        }, 200)
    }
   loadPagos(){
    this.codigoCompania=localStorage.getItem('compania_cod');
    this.descripcionCompania=localStorage.getItem('compania_name');
    this.textTitle='Visualizar'
    runpagosService.GetPagosCompany(this.codigoCompania)
    .then(resp=>{
        this.Pago=[];
        this.Pago1=[];
        this.Pago2=[];
        this.Pago=resp;
        this.Pago1=resp;
        this.Pago2=resp;
    })
   }
   handleCurrentChange(val:PagosModel){
    this.pagosSelect=val;    
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
      if(this.pagosSelect.strPayRun_NO!=undefined && this.pagosSelect.intIdPayRunH_ID!=-1){
          // this.vifprogress=true;
          // this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            debugger;
            if(this.pagosSelect.strPayRun_NO!=undefined && this.pagosSelect.intIdPayRunH_ID!=-1){
              router.push({ path: `/barmenu/FI-FINANZAS/Tesoreria/viewandedit_pagos/viewandedit_pagos`, query: { vista:this.textTitle ,data:JSON.stringify(this.pagosSelect) }  })
            }
          }, 600)
        }
        else{
          // this.vifprogress=false;
          this.textosave='Seleccione un run de pagos. ';
          this.warningMessage('Seleccione un run de pagos. ');
        }
      }
      async validad(){
        var data=this.like(this.Pago1,'strPayRun_NO',this.pagosSelect.strPayRun_NO)
        if(data.length>0&&this.pagosSelect.strPayRun_NO!=''){
            this.pagosSelect=data[0];
            await setTimeout(() => {
                debugger;
                if(this.pagosSelect.strPayRun_NO!=undefined && this.pagosSelect.intIdPayRunH_ID!=-1){
                  router.push({ path: `/barmenu/FI-FINANZAS/Tesoreria/viewandedit_pagos/viewandedit_pagos`, query: { vista:this.textTitle ,data:JSON.stringify(this.pagosSelect) }  })
                }
              }, 600)
        }
        else{
            this.warningMessage('No existe el run de pago. ');
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
        this.Pago = this.Pago1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.Pago[this.intlineaselect]);    
        this.blnilterstrPayRun_NO=false;
        this.blnilterdtmPayRun_Date=false;
        this.blnilterstrPayRun_Curr=false;
        this.blnilterdtmPayRunPay_Date=false;
        this.blnilterdtmPayRunExpired_Date=false;
        this.blnilterstrBank_Name=false;
        this.blnilterstrPayRun_Account=false;
        this.Pago2=this.Pago1;
        this.Pago = this.Pago2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        var data=await this.sortByKeyAsc(this.Pago1,this.clickColumn) 
        this.Pago2=[];
        this.Pago2=data;
        this.Pago = await this.Pago2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.Pago1,this.clickColumn) 
        this.Pago2=[];
        this.Pago2=data;
        this.Pago = this.Pago2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      btnBuscar(){
        var data=this.like(this.Pago1,this.clickColumn,this.txtbuscar)
        this.Pago=[];
        this.Pago=data;
        this.dialogBusquedaFilter=false;
      }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.Pago = this.Pago1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.Pago = this.Pago1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        if(val.property=="strPayRun_NO"){
            this.clickColumn="strPayRun_NO";
            this.blnilterstrPayRun_NO=true;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="dtmPayRun_Date"){
            this.clickColumn="dtmPayRun_Date";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=true;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="strPayRun_Curr"){
            this.clickColumn="strPayRun_Curr";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=true;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="dtmPayRunPay_Date"){
            this.clickColumn="dtmPayRunPay_Date";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=true;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="dtmPayRunExpired_Date"){
            this.clickColumn="dtmPayRunExpired_Date";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=true;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="strBank_Name"){
            this.clickColumn="strBank_Name";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=true;
            this.blnilterstrPayRun_Account=false;
        }
        if(val.property=="strPayRun_Account"){
            this.clickColumn="strPayRun_Account";
            this.blnilterstrPayRun_NO=false;
            this.blnilterdtmPayRun_Date=false;
            this.blnilterstrPayRun_Curr=false;
            this.blnilterdtmPayRunPay_Date=false;
            this.blnilterdtmPayRunExpired_Date=false;
            this.blnilterstrBank_Name=false;
            this.blnilterstrPayRun_Account=true;
        }
    }
    filterstrstrPayRun_NO(h,{column,$index}){
        if(this.blnilterstrPayRun_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmPayRun_Date(h,{column,$index}){
        
        if(this.blnilterdtmPayRun_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrPayRun_Curr(h,{column,$index}){
        
        if(this.blnilterstrPayRun_Curr){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmPayRunPay_Date(h,{column,$index}){
        if(this.blnilterdtmPayRunPay_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmPayRunExpired_Date(h,{column,$index}){
        
        if(this.blnilterdtmPayRunExpired_Date){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrBank_Name(h,{column,$index}){
        
        if(this.blnilterstrBank_Name){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrPayRun_Account(h,{column,$index}){
        
        if(this.blnilterstrPayRun_Account){
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
    data() {
        return {
            nameComponent: 'crear-po',
            textTitle:'',
            Pago:[],
            Pago1:[],
            Pago2:[],
            codigoCompania:'',
            descripcionCompania:''
        }
    }
}