import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { HESModel } from '@/modelo/maestro/hes';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Loading } from 'element-ui';
import Global from '@/Global';
import ordencompraService from '@/components/service/ordencompra.service';
import hesService from '@/components/service/hes.service';
import { Alert } from '@/types';
@Component({
    name: 'modificar-po',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class EditHesComponent extends Vue {
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
    RegistersForPage: number = 10;
    totalRegistros: number = 100;
    vifprogress:boolean=false;
    issave:boolean=false;
    iserror:boolean=false;
    blnilterstrHES_NO:boolean=false;
    blnilterstrDesc_Header:boolean=false;
    blnilterstrPO_NO:boolean=false;
    blnilterstrPO_Item_Desc:boolean=false;
    blnilterstrCategItem_Cod:boolean=false;
    blnilterstrPO_Item_NO:boolean=false;
    blnilterdtmAuthsd_Date:boolean=false;
    dialogBusquedaFilter:boolean=false;
    //**[ORDEN COMPRA] */
    public GridHes: Array<HESModel>;
    public GridHes1: Array<HESModel>;
    public GridHes2: Array<HESModel>;
    public hesSelect: HESModel=new HESModel();
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
    this.textTitle='Modificar';
    hesService.GetAllHes(this.codigoCompania)
    .then(resp=>{
        this.GridHes=[];
        this.GridHes1=[];
        this.GridHes2=[];
        console.log(resp);        
        this.GridHes=resp;
        this.GridHes1=resp;
        this.GridHes2=resp;
    })
   }
   handleCurrentChange(val:HESModel){
    this.hesSelect=val;    
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
      if(this.hesSelect.strHES_NO!='' && this.hesSelect.intIdHESH_ID!=-1){
          // this.vifprogress=true;
          // this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            debugger;
            if(this.hesSelect.strHES_NO!='' && this.hesSelect.intIdHESH_ID!=-1){
              router.push({ path: `/barmenu/LO-LOGISTICA/HES/viewandedit_hes`, query: { vista:'Modificar' ,data:JSON.stringify(this.hesSelect) }  })
            }
          }, 600)
        }
        else{
          // this.vifprogress=false;
          this.textosave='Seleccione la HES. ';
          this.warningMessage('Seleccione la HES. ');
        }
      }
      validad(){
        
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
      Limpiar(){
        this.GridHes = this.GridHes1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.GridHes[this.intlineaselect]);    
        // this.blnilterstrPO_NO=false;
        // this.blnilterstrRequis_NO=false;
        // this.blnilterstrPO_Desc=false;
        // this.blnilterstrVendor_Desc=false;
        // this.blnilterdtmProcess_Date=false;
        // this.blnilterfltTotal_Val=false;
        this.GridHes2=this.GridHes1;
        this.GridHes = this.GridHes2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        var data=await this.sortByKeyAsc(this.GridHes1,this.clickColumn) 
        this.GridHes2=[];
        this.GridHes2=data;
        this.GridHes = await this.GridHes2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.GridHes1,this.clickColumn) 
        this.GridHes2=[];
        this.GridHes2=data;
        this.GridHes = this.GridHes2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      btnBuscar(){
        var data=this.like(this.GridHes1,this.clickColumn,this.txtbuscar)
        this.GridHes=[];
        this.GridHes=data;
        this.dialogBusquedaFilter=false;
      }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.GridHes = this.GridHes1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.GridHes = this.GridHes1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        if(val.property=="strHES_NO"){
            this.clickColumn="strHES_NO";
            this.blnilterstrHES_NO=true;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="strDesc_Header"){
            this.clickColumn="strDesc_Header";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=true;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="strPO_NO"){
            this.clickColumn="strPO_NO";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=true;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="strAuthsd_BYInt"){
            this.clickColumn="strAuthsd_BYInt";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=true;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="strCategItem_Cod"){
            this.clickColumn="strCategItem_Cod";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=true;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="strPO_Item_NO"){
            this.clickColumn="strPO_Item_NO";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=true;
            this.blnilterdtmAuthsd_Date=false;
        }
        if(val.property=="dtmAuthsd_Date"){
            this.clickColumn="dtmAuthsd_Date";
            this.blnilterstrHES_NO=false;
            this.blnilterstrDesc_Header=false;
            this.blnilterstrPO_NO=false;
            this.blnilterstrPO_Item_Desc=false;
            this.blnilterstrCategItem_Cod=false;
            this.blnilterstrPO_Item_NO=false;
            this.blnilterdtmAuthsd_Date=true;
        }
    }
    filterstrHES_NO(h,{column,$index}){
        if(this.blnilterstrHES_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrDesc_Header(h,{column,$index}){
        
        if(this.blnilterstrDesc_Header){
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
      filterstrPO_Item_Desc(h,{column,$index}){
        if(this.blnilterstrPO_Item_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrCategItem_Cod(h,{column,$index}){
        
        if(this.blnilterstrCategItem_Cod){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrPO_Item_NO(h,{column,$index}){
        
        if(this.blnilterstrPO_Item_NO){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmAuthsd_Date(h,{column,$index}){
        
        if(this.blnilterdtmAuthsd_Date){
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
            GridHes:[],
            GridHes1:[],
            GridHes2:[],
            codigoCompania:'',
            descripcionCompania:''
        }
    }
}