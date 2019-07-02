import Vue from 'vue';
import {Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import hesService from '@/components/service/hes.service';
import { HESModel } from '@/modelo/maestro/hes';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import {HesDetalleModel} from '@/modelo/maestro/hesDetalle';
import { Alert } from '@/types';
@Component({
    name:'aprobar-hes',
    components:{
        'buttons-accions':ButtonsAccionsComponent,
        'quickaccessmenu':QuickAccessMenuComponent,
      } ,
})
export default class AprobarHesComponent extends Vue{
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    formBusqueda:any={
        'strHES_NO':'',
        'desde':new Date(),
        'hasta':new Date()
      }
    strHES_NO:string='';
    fechaHasta:any=new Date();
    fechaDesde:any=new Date();
    vifprogress:boolean=true;
    textosave:string='';
    iserror:boolean=false;
    issave:boolean=false;
    valuem=0;
    fecha_actual:string;
    selectrow:any;
    currentRow:any;
    visualizar:boolean;
    codigoCompania:any;
    descripcionCompania:any;
    public tableData:Array<HESModel>=[]; 
    public tableData2:Array<HESModel>=[]; 
    public tableData3:Array<HESModel>=[]; 
    public newHes:HESModel=new HESModel();
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    blnilterstrHES_NO:boolean=false;
    blnilterstrDesc_Header:boolean=false;
    blnilterstrPO_NO:boolean=false;
    blnilterstrPO_Item_Desc:boolean=false;
    blnilterstrCategItem_Cod:boolean=false;
    blnilterstrPO_Item_NO:boolean=false;
    blnilterdtmAuthsd_Date:boolean=false;
    dialogBusquedaFilter:boolean=false;
    tableData1:any=[
        {
          date:Global.getParseDate(new Date().toDateString()),
          categoriacuenta: '',
          categorialinea: '',
          cuentacontable: '',
          material:'',
          material_descripcion:'',
          cantidad:0,
          unidad_medida:'',
          proveedor:'',
          moneda:'',
          prioridad:'',
          fecha_estimada:Global.getParseDate(new Date().toDateString()),
          centrocosto:'',
        }
      ];
    constructor(){
        super();
        Global.nameComponent='aprobar-hes';
        // for(var i=0;i<10;i++){
        //   var reqDetalle:HESModel=new HESModel();
        //   reqDetalle.chrStatus="A";
        //   this.tableData.push(reqDetalle);
        // }    
        setTimeout(() => {
          this.load();
        }, 200)
    }
    load(){
      this.codigoCompania=localStorage.getItem('compania_cod');
      this.descripcionCompania=localStorage.getItem('compania_name');
      var view = this.$route.query.vista;
      if(view==="visualizar"){
        this.visualizar=true;
        console.log('A');
        
      }
      else{
        this.visualizar=false;
        console.log('B');
        
      }
      hesService.GetAllHes(this.codigoCompania)
      .then(response=>{
        this.tableData=response;
        this.tableData1=response;
        this.tableData2=response;
        
        var cont=this.tableData.length;        
        for(var i=0;i<this.tableData.length;i++){
          this.tableData[i].strModified_User=this.getDateString(this.tableData[i].dtmProcess_Date);
        }
        for(var i=0;i<50-cont;i++){
          this.tableData.push(this.newHes);
        }
      })
    }
    getDateString(fecha){
      var dateString = new Date(fecha);
      var dia = dateString.getDate();
          var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
          var yyyy = dateString.getFullYear();
          var dd = (dia<10) ? '0'+dia : dd=dia;
          var mm = (mes<10) ? '0'+mes : mm=mes;
          return dd+'.'+mm+'.'+yyyy;
      }
    handleCurrentChange(val) {
        if(val!=null){
          this.selectrow=val;
          this.currentRow = val;
        }
      }
      async validarView(){
        debugger;
        if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdHESH_ID!=undefined){
          this.vifprogress=true;
          this.valuem=0;
          await setTimeout(() => {
            for(var i=0;i<100;i++){
              this.valuem++; 
            }
          }, 200)
          await setTimeout(() => {
            console.log('----,,,',this.selectrow);
            if(this.selectrow!=undefined && this.selectrow!=null && this.selectrow.intIdHESH_ID!=undefined){
              router.push({ path: `/barmenu/LO-LOGISTICA/HES/viewandedit_hes`, query: { vista: 'Aprobar',data:JSON.stringify(this.selectrow) }  })
            }
          }, 600)
        }
        else{
          this.vifprogress=false;
          this.textosave='Seleccione alguna salida. ';
          this.warningMessage(this.textosave);
        }
      }
      warningMessage(newMsg : string) {
        this.$message({
          showClose: true,
          message: newMsg,
          type: 'warning'
        });
      }
    async Buscar(){
        var data:any=this.formBusqueda;
        if(this.strHES_NO==''){
          data.strHES_NO='*'
        }
        else{
          data.strHES_NO=this.strHES_NO
        }
        var hdate=new Date(this.fechaHasta);
        hdate.setDate(hdate.getDate()+1)
        data.desde=await Global.getDateString(this.fechaDesde)
        data.hasta= await Global.getDateString(hdate)
        await hesService.busquedaHES(data)
        .then(res=>{
          this.tableData=res;
          var cont=this.tableData.length;
          for(var i=0;i<this.tableData.length;i++){
            this.tableData[i].strModified_User=Global.getParseDate(this.tableData[i].dtmProcess_Date);
          }
          for(var i=0;i<50-cont;i++){
            this.tableData.push(this.newHes);
          }
        })
        .catch(error=>{          
        })
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
      btnBuscar(){
        var data=this.like(this.tableData1,this.clickColumn,this.txtbuscar)
        this.tableData=[];
        this.tableData=data;
        this.dialogBusquedaFilter=false;
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
      data(){
        return{
          codigoCompania:'',
          tableData:[],
          tableData1:[],
          tableData2:[],
          descripcionCompania:''
        }
    }    
}