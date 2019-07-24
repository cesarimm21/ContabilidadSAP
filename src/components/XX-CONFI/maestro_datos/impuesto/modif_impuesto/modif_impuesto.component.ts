import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import impuestoService from '@/components/service/impuesto.service';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { ImpuestoModel } from '@/modelo/maestro/impuesto';
import { Loading } from 'element-ui';
import Global from '@/Global';
@Component({
    name: 'modificar-po',
    components: {
        'buttons-accions': ButtonsAccionsComponent,
        'quickaccessmenu': QuickAccessMenuComponent,
    }
})
export default class ModificarImpuestoComponent extends Vue {
    nameComponent: string = 'modificar-po';
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
    blnilterstrWH_Cod:boolean=false;
    blnilterstrWH_Desc:boolean=false;
    blnilterfltPorcent:boolean=false;
    blnilterstrCalc_Bas1:boolean=false;
    blnilterstrAcct_Debit:boolean=false;
    blnilterstrAcct_Credit:boolean=false;
    blnilterstrCalc_Bas2:boolean=false;
    blnilterstrWH_Cod2:boolean=false;
    blnilterstrCalc_Bas3:boolean=false;
    blnilterstrWH_Cod3:boolean=false;
    blnilterstrCta_Country:boolean=false;
    
    dialogBusquedaFilter:boolean=false;
    public Impuesto:ImpuestoModel=new ImpuestoModel();
    gridImpuesto:ImpuestoModel[];
    gridImpuesto1:ImpuestoModel[];
    gridImpuesto2:ImpuestoModel[];
    currentRow:any;
    vifprogress:boolean=true;
    valuem:number=0;
    textosave:string='';
    dialogInactivar:boolean=false;
    item:string='';
    
    issave:boolean=false;
    iserror:boolean=false;

    constructor() {
        super();
        Global.nameComponent = 'modificar-po';  
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
        impuestoService.GetAllImpuesto2()
        .then(resp=>{
            this.gridImpuesto=[];
            this.gridImpuesto1=[];
            this.gridImpuesto2=[];
            this.gridImpuesto=resp;
            this.gridImpuesto1=resp;
            this.gridImpuesto2=resp;
        })
    }
   handleCurrentChange(val:ImpuestoModel){
    this.Impuesto=val;
   }
   getDateString(fecha:string){
    var dateString = new Date(fecha).toLocaleDateString('es-PE', this.options)
    return dateString;
    }
    confirmaraceptar(){
      }
      btnBuscar(){
        var data=this.like(this.gridImpuesto1,this.clickColumn,this.txtbuscar)
        this.gridImpuesto=[];
        this.gridImpuesto=data;
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
        var data=await this.sortByKeyAsc(this.gridImpuesto1,this.clickColumn) 
        this.gridImpuesto2=[];
        this.gridImpuesto2=data;
        this.gridImpuesto = await this.gridImpuesto2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        await loading.close();
      }
      DscItem(){
        debugger;
        console.log("desc",this.clickColumn)
        var data=this.sortByKeyDesc(this.gridImpuesto1,this.clickColumn) 
        this.gridImpuesto2=[];
        this.gridImpuesto2=data;
        this.gridImpuesto = this.gridImpuesto2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      
      }
      Limpiar(){
        this.gridImpuesto = this.gridImpuesto1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
        document.setCurrentRow(this.gridImpuesto[this.intlineaselect]);    
        this.blnilterstrWH_Cod=false;
        this.blnilterstrWH_Desc=false;
        this.blnilterfltPorcent=false;
        this.blnilterstrCalc_Bas1=false;
        this.blnilterstrAcct_Debit=false;
        this.blnilterstrAcct_Credit=false;
        this.blnilterstrCalc_Bas2=false;
        this.blnilterstrWH_Cod2=false;
        this.blnilterstrCalc_Bas3=false;
        this.blnilterstrWH_Cod3=false;
        this.blnilterstrCta_Country=false;        
        this.gridImpuesto2=this.gridImpuesto1;
        this.gridImpuesto = this.gridImpuesto2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        var document:any = this.$refs.missionTable;
      }
      Print(){
        window.print();
      }
    async  EliminarItem(){
        if(this.Impuesto.strWH_Cod!=''){
            this.vifprogress=true;
            this.valuem=0;
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
                debugger;
                
                var name:any=localStorage.getItem('User_Usuario');
                if(this.Impuesto.strWH_Cod!=''&& this.Impuesto.intIdWH_ID!=-1){
                  impuestoService.DeleteImpuesto(this.Impuesto.intIdWH_ID,name)
                  .then(resp=>{
                    this.$message({
                        showClose: true,
                        message: 'Se elimino correctamente',
                        type: 'success'
                      });
                      this.Impuesto=new ImpuestoModel();
                      this.loadImpuesto();
                  })
                  .catch(error=>{
                    this.$message({
                        showClose: true,
                        message: 'No se elimino',
                        type: 'error'
                      });
                  })
                }
              }, 600)
        }
        else{
            this.vifprogress=false;
            this.textosave='Error eliminar impuesto. ';
            this.warningMessage('Error eliminar impuesto. ');
        }
    }
    async validad(){
        
        if(this.Impuesto.strWH_Cod!=''){
            this.vifprogress=true;
            this.valuem=0;
            impuestoService.GetOnlyOneImpuesto(this.Impuesto.strWH_Cod)
            .then(res=>{
                this.Impuesto=res;
            })
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
              debugger;
              if(this.Impuesto.strWH_Cod!=''&&this.Impuesto.strWH_Desc!=''){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto`, query: { vista:this.textTitle ,data:JSON.stringify(this.Impuesto) }  })
              }
            }, 600)
          }
          else{
            this.vifprogress=false;
            this.textosave='Codigo impuesto no existe. ';
            this.warningMessage('Codigo impuesto no existe. ');
          }
        }
     async validarView(){
        if(this.Impuesto.strWH_Cod!='' && this.Impuesto.intIdWH_ID!=-1){
            this.vifprogress=true;
            this.valuem=0;
            await setTimeout(() => {
              for(var i=0;i<100;i++){
                this.valuem++; 
              }
            }, 200)
            await setTimeout(() => {
              debugger;
              if(this.Impuesto.strWH_Cod!='' && this.Impuesto.intIdWH_ID!=-1){
                router.push({ path: `/barmenu/XX-CONFI/maestro_datos/impuesto/viewandedit_impuesto`, query: { vista:this.textTitle ,data:JSON.stringify(this.Impuesto) }  })
              }
            }, 600)
          }
          else{
            this.vifprogress=false;
            this.textosave='Seleccione la Impuesto. ';
            this.warningMessage('Seleccione la Impuesto. ');
          }
        }
      siguiente(){
        if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
          this.pagina++;
          this.gridImpuesto = this.gridImpuesto1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
        }
      }
      anterior(){
        if(this.pagina>1){
        this.pagina--;
        this.gridImpuesto = this.gridImpuesto1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
        if(val.property=="strWH_Cod"){
            this.clickColumn="strWH_Cod";
            this.blnilterstrWH_Cod=true;
            this.blnilterstrWH_Desc=false; this.blnilterfltPorcent=false;this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;this.blnilterstrAcct_Credit=false;this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;this.blnilterstrCalc_Bas3=false;this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strWH_Desc"){
            this.clickColumn="strWH_Desc";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=true;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="fltPorcent"){
            this.clickColumn="fltPorcent";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=true;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strCalc_Bas1"){
            this.clickColumn="strCalc_Bas1";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=true;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strAcct_Debit"){
            this.clickColumn="strAcct_Debit";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=true;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strAcct_Credit"){
            this.clickColumn="strAcct_Credit";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=true;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strCalc_Bas2"){
            this.clickColumn="strCalc_Bas2";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=true;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strWH_Cod2"){
            this.clickColumn="strWH_Cod2";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=true;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strCalc_Bas3"){
            this.clickColumn="strCalc_Bas3";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=true;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strWH_Cod3"){
            this.clickColumn="strWH_Cod3";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=true;
            this.blnilterstrCta_Country=false;
        }
        if(val.property=="strCta_Country"){
            this.clickColumn="strCta_Country";
            this.blnilterstrWH_Cod=false;
            this.blnilterstrWH_Desc=false;
            this.blnilterfltPorcent=false;
            this.blnilterstrCalc_Bas1=false;
            this.blnilterstrAcct_Debit=false;
            this.blnilterstrAcct_Credit=false;
            this.blnilterstrCalc_Bas2=false;
            this.blnilterstrWH_Cod2=false;
            this.blnilterstrCalc_Bas3=false;
            this.blnilterstrWH_Cod3=false;
            this.blnilterstrCta_Country=true;
        }
    }
    filterstrWH_Cod(h,{column,$index}){
        if(this.blnilterstrWH_Cod){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrWH_Desc(h,{column,$index}){        
        if(this.blnilterstrWH_Desc){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filtersfltPorcent(h,{column,$index}){
        
        if(this.blnilterfltPorcent){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrCalc_Bas1(h,{column,$index}){
        if(this.blnilterstrCalc_Bas1){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrAcct_Debit(h,{column,$index}){
        
        if(this.blnilterstrAcct_Debit){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrAcct_Credit(h,{column,$index}){
        
        if(this.blnilterstrAcct_Credit){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrCalc_Bas2(h,{column,$index}){
        
        if(this.blnilterstrCalc_Bas2){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrWH_Cod2(h,{column,$index}){
        
        if(this.blnilterstrWH_Cod2){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrCalc_Bas3(h,{column,$index}){
        
        if(this.blnilterstrCalc_Bas3){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrWH_Cod3(h,{column,$index}){
        
        if(this.blnilterstrWH_Cod3){
          return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
          [ h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
            , column.label)])
        }
        else{
          return h('span',{style: 'padding-left: 5px;'}, column.label);
        } 
      }
      filterstrCta_Country(h,{column,$index}){
        
        if(this.blnilterstrCta_Country){
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
  this.item=this.Impuesto.strWH_Cod;
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
  this.Impuesto.strModified_User=nameuser;
  if(this.Impuesto.strWH_Cod!=""){
    
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Activando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
    );   
    await impuestoService.activar(this.Impuesto)
    .then(respo=>{
      loadingInstance.close();
      this.successMessage('Se Activo Rubro '+this.Impuesto.strWH_Cod)
      this.load();
      this.issave=true;
      this.iserror=false;
      this.textosave='Se Activo Rubro '+this.Impuesto.strWH_Cod;
      this.dialogInactivar=false;
    }).catch(ee=>{
      loadingInstance.close();
      this.issave=false;
      this.iserror=true;
      this.textosave='Error en Activar '+this.Impuesto.strWH_Cod;
      this.errorMessage('Error en Activar '+this.Impuesto.strWH_Cod)})
      this.dialogInactivar=false;
  }
  else{
    this.warningMessage('Debe de seleccionar una fila!!!');
  }
}


    data() {
        return {
            nameComponent: 'crear-po',
            textTitle:'',
            gridImpuesto:[],
            gridImpuesto1:[],
            gridImpuesto2:[],
            companyCod:'',
            companyName:''
        }
    }
}