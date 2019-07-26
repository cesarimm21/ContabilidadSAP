import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import router from '@/router';
import {ProductoModel} from '@/modelo/maestro/producto';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import productoService from '@/components/service/producto.service';
import { Loading } from 'element-ui';
@Component({
  name: 'modificar-servicio',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'buttons-accions': ButtonsAccionsComponent,
  }
})
export default class VisualizarModificarServicioComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public documento:ProductoModel=new ProductoModel();
  gridDocumento:ProductoModel[];
  gridDocumento1:ProductoModel[];
  gridDocumento2:ProductoModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  pagina: number =1;
  RegistersForPage: number = 100;
  totalRegistros: number = 100;
  clickColumn:string='';
  txtbuscar:string='';
  Column:string='';
  dialogBusquedaFilter:boolean=false;
  blnfilterstrWHS_Cod:boolean=false;
  blnfilterstrWHS_Desc:boolean=false;
  blnfilterstrStock_Cod:boolean=false;
  blnfilterstrStock_Desc:boolean=false;
  blnfilterstrUM_Cod:boolean=false;
  blnfilterfltQuantity:boolean=false;
  blnfilterfltPrecUnit_Local:boolean=false;
  planDialog:boolean=false;
  planActivarDialog:boolean=false;
  loading1:boolean=true;
  nameuser:any;
  strStock_Cod:string='';
  constructor(){    
        super();
        Global.nameComponent='modificar-servicio';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');
        productoService.getProductoService(this.companyCod)
        .then(response=>{
          this.gridDocumento=[];   
          this.gridDocumento1=[];
          this.gridDocumento2=[];
          this.gridDocumento=response;
          this.gridDocumento1=response;
          this.gridDocumento2=response;
          this.loading1=false;
        })
        .catch(error=>{
          this.loading1=false;
          this.$message({
            showClose: true,
              type: 'error',
              message: 'No hay conexion '
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
    handleCurrentChange(val:ProductoModel){
      this.documento=val;
      this.strStock_Cod=this.documento.strStock_Cod;
     }
    btnBuscar(){
      var data=Global.like(this.gridDocumento1,this.clickColumn,this.txtbuscar)
      this.gridDocumento=[];
      this.gridDocumento=data;
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
      if(this.Column!=""){
        this.dialogBusquedaFilter=true;
        this.txtbuscar='';
      }
      else{
        this.$message('Seleccione columna')
      }
    }
    async AscItem(){
      let loading = Loading.service({
        fullscreen: true,
        text: 'Cargando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
      );
      var data=await this.sortByKeyAsc(this.gridDocumento1,this.clickColumn) 
      this.gridDocumento2=[];
      this.gridDocumento2=data;
      this.gridDocumento = await this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      await loading.close();
    }
    DscItem(){
      var data=this.sortByKeyDesc(this.gridDocumento1,this.clickColumn) 
      this.gridDocumento2=[];
      this.gridDocumento2=data;
      this.gridDocumento = this.gridDocumento2.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    
    }
    Limpiar(){
      this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));    
      this.blnfilterstrWHS_Cod=false;
      this.blnfilterstrWHS_Desc=false;
      this.blnfilterstrStock_Cod=false;
      this.blnfilterstrStock_Desc=false;
      this.blnfilterstrUM_Cod=false;
      this.blnfilterfltQuantity=false;
      this.blnfilterfltPrecUnit_Local=false;
    }
    Print(){
      window.print();
    }
    async  EliminarItem(){
      if(this.documento.intIdInvStock_ID!=-1&&this.documento.strStock_Cod!=""&&this.documento.strStock_Desc!=""){
        this.planDialog=true;
      }
      else{
        this.warningMessage("Selecciona Servicio")
      }    
    }
    inactivarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.documento.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Inactivando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
        productoService.eliminarProducto(this.documento)
      .then(resp=>{
        loadingInstance.close();
        this.planDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Inactivo correctamente '+resp.strStock_Cod,
            type: 'success'
          });
          this.documento=new ProductoModel();
          this.load();
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se Inactivo Correctamente '+resp.strStock_Cod;
      })
      .catch(error=>{
        loadingInstance.close();
        this.planDialog=false;
        this.$message({
            showClose: true,
            message: 'No se Inactivo',
            type: 'error'
          });
          this.issave = false;
          this.iserror = true;
      })
    }
    async Activar(){
      if(this.documento.strStock_Cod!="" && this.documento.strStock_Desc!=""){
        this.planActivarDialog=true;
      }
      else{
        this.warningMessage('Selecciones Servicio')
      }
    }
    activarPlan(){
      this.nameuser=localStorage.getItem('User_Usuario');
      this.documento.strModified_User=this.nameuser;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Activando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        ); 
      productoService.activar(this.documento)
      .then(resp=>{
        loadingInstance.close();
        this.planActivarDialog=false;
        this.$message({
            showClose: true,
            message: 'Se Activo correctamente '+resp.strStock_Cod,
            type: 'success'
          });
          this.documento=new ProductoModel();
          this.load();
          this.issave = true;
          this.iserror = false;
          this.textosave = 'Se Activo Correctamente '+resp.strStock_Cod;
      })
      .catch(error=>{
        loadingInstance.close();
        this.planActivarDialog=false;
        this.$message({
            showClose: true,
            message: 'No se Activo',
            type: 'error'
          });
          this.issave = false;
          this.iserror = true;
      })
    }
  async validad(){      
    var data=Global.like(this.gridDocumento1,'strStock_Cod',this.strStock_Cod)
    if(data.length>0){
      this.documento=data[0];
      if(this.documento.strStock_Cod==this.strStock_Cod){
        await setTimeout(() => {
          if(this.documento.strStock_Cod!=''){
            router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/servicio_modificar`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
          }
        }, 600)
      }
      else{
        if(this.strStock_Cod==''){
          this.textosave='Inserte Servicio. ';
          this.warningMessage('Inserte Servicio. ');
        }
        else{
          this.textosave='No existe Servicio. ';
          this.warningMessage('No existe Servicio. ');
        }        
      }
    }
    else{
      this.textosave='No existe Servicio. ';
      this.warningMessage('No existe Servicio. ');
    }
  }
   async validarView(){
      if(this.documento.intIdInvStock_ID!=-1){
          await setTimeout(() => {
            if(this.documento.strStock_Cod!=''){
              router.push({ path: `/barmenu/LO-LOGISTICA/maestro_datos/servicio/servicio_modificar`, query: { vista:'modificar' ,data:JSON.stringify(this.documento) }  })
            }
          }, 600)
        }
        else{
          this.textosave='Seleccione Servicio. ';
          this.warningMessage('Seleccione Servicio. ');
        }
      }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.gridDocumento = this.gridDocumento1.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
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
 ///#region  button accion
 filterstrWHS_Cod(h,{column,$index}){
    
    
  if(this.blnfilterstrWHS_Cod){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterstrWHS_Desc(h,{column,$index}){
  
  
  if(this.blnfilterstrWHS_Desc){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterstrStock_Cod(h,{column,$index}){
  
  
  if(this.blnfilterstrStock_Cod){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterstrStock_Desc(h,{column,$index}){
  
  
  if(this.blnfilterstrStock_Desc){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterstrUM_Cod(h,{column,$index}){
  
  
  if(this.blnfilterstrUM_Cod){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterfltQuantity(h,{column,$index}){
  
  
  if(this.blnfilterfltQuantity){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}
filterfltPrecUnit_Local(h,{column,$index}){
  
  
  if(this.blnfilterfltPrecUnit_Local){
    return h('th',{style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); width: 100vw;'},
    [  h('i', {'class': 'fa fa-filter' ,style: 'padding-left: 5px;'}),
      h('span',  {style: 'background: linear-gradient(rgb(255, 245, 196) 0%, rgb(255, 238, 159) 100%); !important;padding-left: 5px;'}
      , column.label),
     ])
  }
  else{
    return h('span',{style: 'padding-left: 5px;'}, column.label);
  } 
}

headerclick(val){
  
  this.Column=val.label;
  Global.setColumna(this.Column);
  this.clickColumn=val.property;
   
  if(val.property=="strWHS_Cod"){
    this.blnfilterstrWHS_Cod=true;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
  }
  if(val.property=="strWHS_Desc"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=true;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
  }
  if(val.property=="strStock_Cod"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=true;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
  }
  
  if(val.property=="strStock_Desc"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=true;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
  }
  if(val.property=="strUM_Cod"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=true;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=false;
  }
  if(val.property=="fltQuantity"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=true;
    this.blnfilterfltPrecUnit_Local=false;
  }
  if(val.property=="fltPrecUnit_Local"){
    this.blnfilterstrWHS_Cod=false;
    this.blnfilterstrWHS_Desc=false;
    this.blnfilterstrStock_Cod=false;
    this.blnfilterstrStock_Desc=false;
    this.blnfilterstrUM_Cod=false;
    this.blnfilterfltQuantity=false;
    this.blnfilterfltPrecUnit_Local=true;
  }
  
}
    //#endregion
  backPage(){
      window.history.back();
    }
    reloadpage(){
      window.location.reload();
    }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridDocumento:[],
            gridDocumento1:[],
            gridDocumento2:[],
            loading1:true,
            strStock_Cod:''
        }
    }
  
}
