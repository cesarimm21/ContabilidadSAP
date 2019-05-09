import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import tipocambioService from '@/components/service/tipocambio.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { TipoCambioModel } from '@/modelo/maestro/tipocambio';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'modificar-tipo-cambio',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class ModificarTipoCambioComponent extends Vue {
    nameComponent: string = 'modificar-tipo-cambio';
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
    inputNormal:boolean=false;
    inputAño:boolean=false;
    inputfecha:boolean=false;
    inputNumber:boolean=false;

    blnilterstrExchRate_OF:boolean=false;
    blnilterstrExchRate_TO:boolean=false;
    blnilterintExchRate_Year:boolean=false;
    blnilterdtmExchRate_Date:boolean=false;
    blnilterfltExchRate_Buy:boolean=false;
    blnilterfltExchRate_Sale:boolean=false;
    blnilterfltExchRate_Agrem:boolean=false;
    
    dialogBusquedaFilter:boolean=false;
    public TipoCambio:TipoCambioModel=new TipoCambioModel();
    gridTipoDocumento:TipoCambioModel[];
    gridTipoDocumento1:TipoCambioModel[];
    gridTipoDocumento2:TipoCambioModel[];
    currentRow:any;
    vifprogress:boolean=true;
    valuem:number=0;
    textosave:string='';
    constructor() {
        super();
        Global.nameComponent = 'modificar-tipo-cambio';  
        setTimeout(() => {
            this.load();
        }, 200)
    }
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        this.textTitle='Modificar';
        this.loadTipoCambio();
    }
    loadTipoCambio(){
        tipocambioService.GetAllTipoCambioALL()
        .then(resp=>{
            this.gridTipoDocumento=[];
            this.gridTipoDocumento1=[];
            this.gridTipoDocumento2=[];
            this.gridTipoDocumento=resp;
            this.gridTipoDocumento1=resp;
            this.gridTipoDocumento2=resp;
        })
    }
   handleCurrentChange(val:TipoCambioModel){
    this.TipoCambio=val;
   }
   getDateString(fecha:string){
    // var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    // console.log(dateString);
    
    // return dateString;
    var dateString = new Date(fecha);
    var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }
    confirmaraceptar(){
      }
      btnBuscar(){
        var data=this.like(this.gridTipoDocumento1,this.clickColumn,this.txtbuscar)
        this.gridTipoDocumento=[];
        this.gridTipoDocumento=data;
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
        var data=await this.sortByKeyAsc(this.gridTipoDocumento1,this.clickColumn) 
        this.gridTipoDocumento2=[];
        this.gridTipoDocumento2=data;
        this.gridTipoDocumento = await this.gridTipoDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.gridTipoDocumento1,this.clickColumn) 
        this.gridTipoDocumento2=[];
        this.gridTipoDocumento2=data;
        this.gridTipoDocumento = this.gridTipoDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      Limpiar(){
        this.gridTipoDocumento = this.gridTipoDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.gridTipoDocumento[this.intlineaselect]);    
        this.blnilterstrExchRate_OF=false;
        this.blnilterstrExchRate_TO=false;
        this.blnilterintExchRate_Year=false;
        this.blnilterdtmExchRate_Date=false;
        this.blnilterfltExchRate_Buy=false;
        this.blnilterfltExchRate_Sale=false;
        this.blnilterfltExchRate_Agrem=false;   
        this.gridTipoDocumento2=this.gridTipoDocumento1;
        this.gridTipoDocumento = this.gridTipoDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
      }
      Print(){
        window.print();
      }
    async  EliminarItem(){
        // if(this.Impuesto.strWH_Cod!=''){
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
        
        // if(this.Impuesto.strWH_Cod!=''){
        //     this.vifprogress=true;
        //     this.valuem=0;
        //     impuestoService.GetOnlyOneImpuesto(this.Impuesto.strWH_Cod)
        //     .then(res=>{
        //         this.Impuesto=res;
        //     })
        //     await setTimeout(() => {
        //       for(var i=0;i<100;i++){
        //         this.valuem++; 
        //       }
        //     }, 200)
        //     await setTimeout(() => {
        //       debugger;
        //       if(this.Impuesto.strWH_Cod!=''&&this.Impuesto.strWH_Desc!=''){
        //         router.push({ path: `/barmenu/XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto`, query: { vista:this.textTitle ,data:JSON.stringify(this.Impuesto) }  })
        //       }
        //     }, 600)
        //   }
        //   else{
        //     this.vifprogress=false;
        //     this.textosave='Codigo impuesto no existe. ';
        //     this.warningMessage('Codigo impuesto no existe. ');
        //   }
        }
     async validarView(){
        if(this.TipoCambio.intExchRate_ID!=-1 && this.TipoCambio.fltExchRate_Buy>0){
            this.vifprogress=true;
            this.valuem=0;
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
              debugger;
              if(this.TipoCambio.intExchRate_ID!=-1 && this.TipoCambio.fltExchRate_Buy>0){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/tipo_cambio/viewandedit_t`, query: { vista:this.textTitle ,data:JSON.stringify(this.TipoCambio) }  })
              }
            }, 600)
          }
          else{
            this.vifprogress=false;
            this.textosave='Seleccione la Tipo cambio. ';
            this.warningMessage('Seleccione la Tipo cambio. ');
          }
        }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.gridTipoDocumento = this.gridTipoDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.gridTipoDocumento = this.gridTipoDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        if(val.property=="strExchRate_OF"){
            this.clickColumn="strExchRate_OF";
            this.blnilterstrExchRate_OF=true;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="strExchRate_TO"){
            this.clickColumn="strExchRate_TO";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=true; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="intExchRate_Year"){
            this.clickColumn="intExchRate_Year";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=true;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="dtmExchRate_Date"){
            this.clickColumn="dtmExchRate_Date";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=true;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="fltExchRate_Buy"){
            this.clickColumn="fltExchRate_Buy";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=true;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="fltExchRate_Sale"){
            this.clickColumn="fltExchRate_Sale";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=true;
            this.blnilterfltExchRate_Agrem=false;
        }
        if(val.property=="fltExchRate_Agrem"){
            this.clickColumn="fltExchRate_Agrem";
            this.blnilterstrExchRate_OF=false;
            this.blnilterstrExchRate_TO=false; 
            this.blnilterintExchRate_Year=false;
            this.blnilterdtmExchRate_Date=false;
            this.blnilterfltExchRate_Buy=false;
            this.blnilterfltExchRate_Sale=false;
            this.blnilterfltExchRate_Agrem=true;
        }        
    }
    filterstrExchRate_OF(h,{column,$index}){
        if(this.blnilterstrExchRate_OF){
            this.inputNormal=true;
            this.inputAño=false;
            this.inputfecha=false;
            this.inputNumber=false;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrExchRate_TO(h,{column,$index}){        
        if(this.blnilterstrExchRate_TO){
            this.inputNormal=true;
            this.inputAño=false;
            this.inputfecha=false;
            this.inputNumber=false;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterintExchRate_Year(h,{column,$index}){
        
        if(this.blnilterintExchRate_Year){
            this.inputNormal=false;
            this.inputAño=true;
            this.inputfecha=false;
            this.inputNumber=false;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterdtmExchRate_Date(h,{column,$index}){
        if(this.blnilterdtmExchRate_Date){
            this.inputNormal=false;
            this.inputAño=false;
            this.inputfecha=true;
            this.inputNumber=false;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterfltExchRate_Buy(h,{column,$index}){
        
        if(this.blnilterfltExchRate_Buy){
            this.inputNormal=false;
            this.inputAño=false;
            this.inputfecha=false;
            this.inputNumber=true;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterfltExchRate_Sale(h,{column,$index}){
        
        if(this.blnilterfltExchRate_Sale){
            this.inputNormal=false;
            this.inputAño=false;
            this.inputfecha=false;
            this.inputNumber=true;
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterfltExchRate_Agrem(h,{column,$index}){
        
        if(this.blnilterfltExchRate_Agrem){
            this.inputNormal=false;
            this.inputAño=false;
            this.inputfecha=false;
            this.inputNumber=true;
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
            gridTipoDocumento:[],
            gridTipoDocumento1:[],
            gridTipoDocumento2:[],
            companyCod:'',
            companyName:''
        }
    }
}