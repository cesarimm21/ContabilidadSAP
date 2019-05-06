import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import Global from '@/Global';
import {PaisModel} from '@/modelo/maestro/pais';
import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import proveedorService from '@/components/service/proveedor.service';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import BPaisComponent from '@/components/buscadores/b_pais/b_pais.vue';
@Component({
    name: 'ViewAndEdit-Proveedor',
    components:{
      'quickaccessmenu':QuickAccessMenuComponent,
      'buttons-accions':ButtonsAccionsComponent,
      'bpais':BPaisComponent,
    }
  })
  export default class VisualizarProveedorComponent extends Vue {
    gridProveedor: ProveedorModel[];
    gridProveedor1: ProveedorModel[];
    tableData:ProveedorModel[]; 
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    selectrowCod:string;
    codigoCompania:any;
    descripcionCompania:any;
    titleDescripcion:string;
    public gridSelectedProveedor:ProveedorModel=new ProveedorModel;
    //**Pais */
    public gridSelectPais:PaisModel=new PaisModel();
    paisVisible:boolean=false;
    btnactivarpais:boolean=false;
    valuem:number=100;
    textosave='';
    issave:boolean=false;
    iserror:boolean=false;
    vifprogress:boolean=true;
    //FILTRO DE BUSQUEDA
    pagina: number =1;
    RegistersForPage: number = 10;
    totalRegistros: number = 100;
    clickColumn:string='';
    txtbuscar:string='';
    Column:string='';
    dialogBusquedaFilter:boolean=false;
    blnfilterstrRequis_NO:boolean=false;
    blnfilterstrTax_ID:boolean=false;
    blnfilterstrVendor_Desc:boolean=false;
    blnfilterstrCountry_Name:boolean=false;
    blnfilterstrProvince:boolean=false;
    blnfilterstrDistrict:boolean=false;
    blnfilterstrAddress:boolean=false;
    constructor(){
        super();
        Global.nameComponent='ViewAndEdit-Proveedor';        
        setTimeout(() => {
          this.load();
        }, 200)
      }
      load(){
      this.titleDescripcion='Visualizar Proveedor';
      this.codigoCompania=localStorage.getItem('compania_cod');
      this.descripcionCompania=localStorage.getItem('compania_name');
      proveedorService.GetProveedoresCompany(this.codigoCompania)
        .then(response=>{
          this.gridProveedor=[];
          this.gridProveedor=response;   
          for(var j=0;j<this.gridProveedor.length;j++){
            if(this.gridProveedor[j].strLastName!=null){
              this.gridProveedor[j].strVendor_Desc=this.gridProveedor[j].strVendor_Desc+', '+this.gridProveedor[j].strLastName+' '+this.gridProveedor[j].strSurName              
            }        
          }
          this.gridProveedor1=this.gridProveedor;
          this.totalRegistros=this.gridProveedor1.length;
          this.tableData=[];
          this.tableData = this.gridProveedor.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
          if(response.length>0){
          }          
          else{
            this.$message({
              showClose: true,
              type: 'info',
              message: 'No hay proveedores'
            })
          }
        }).catch(error=>{
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo cargar lista de proveedores'
          })
        })
    }
    paisSelect(val:PaisModel){
      this.gridSelectPais=val;
      this.paisVisible=false;
    }
    handleClosePais(){
      this.paisVisible=false;
    }
    desactivar_Pais(){
      if(this.paisVisible){
        this.btnactivarpais=false;
      }
    }
    activar_Pais(){
      setTimeout(() => {
        this.btnactivarpais=true;
      }, 120)
      
    }
    paisDialog(){
      this.paisVisible=true;
    }
      proveedorSelect(val){
        this.gridSelectedProveedor=val;  
        this.selectrowCod=this.gridSelectedProveedor.strVendor_NO;   
      }
      async EditarProveedor(val){
        await setTimeout(() => {
            debugger;
            if(this.selectrowCod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/proveedor/ViewAndEdit-proveedor`, query: { vista: 'modificar',data:this.selectrowCod }  })
            }
            else{
                this.openMessageWaring('Seleccione un proveedor')
            }
          }, 200)
        }
        openMessageWaring(strMessage:string){
            this.$message({
                showClose: true,
                type: 'warning',
                message: strMessage
              });
          }
    
    //#region [FILTRO BUSQUEDA]
    Buscar(){
      if(this.Column!=""){
        this.dialogBusquedaFilter=true;
      }
      else{
        alert("Seleccione la columna");
      }
    }
    btnBuscar(){
      var data=this.like(this.gridProveedor,this.clickColumn,this.txtbuscar)
      this.tableData=data;
      this.dialogBusquedaFilter=false;
    }
    like(array, key,keyword) {    
      var responsearr:any = []
      for(var i=0;i<array.length;i++) {
        if(array[i][key]!=undefined){
          if(array[i][key].toString().indexOf(keyword) > -1 ) {
            responsearr.push(array[i])
          }
        }
      }
      return responsearr
  
    }
    siguiente(){
      if(this.pagina<(this.totalRegistros/this.RegistersForPage)){
        this.pagina++;
        this.tableData = this.gridProveedor.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    anterior(){
      if(this.pagina>1){
      this.pagina--;
      this.tableData = this.gridProveedor.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
      }
    }
    async btnEliminar(){
      var user=localStorage.getItem('User_Usuario');
      await proveedorService.DeleteProveedores(this.selectrowCod,user)
      .then(response=>{
        console.log('eliminar',response);
        if(response!=undefined){
           this.textosave='Se elimino correctamento.' + response;
           this.issave=true;
           this.iserror=false;
        }
        else{
          this.issave=false;
          this.iserror=true;
          this.textosave='Ocurrio un error al eliminar.';
        }
      }).catch(error=>{
        
        this.issave=false;
        this.iserror=true;
        this.textosave='Ocurrio un error al eliminar.';
      })
      await this.load();
    }
    Limpiar(){

      this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
        this.Column='';
        this.txtbuscar='';
        this.gridProveedor=this.gridProveedor1;
        this.tableData = this.gridProveedor.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    }
    headerclick(val){
    
      this.Column=val.label;
      this.clickColumn=val.property;
      if(val.property=="strVendor_NO"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=true;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
      }
      if(val.property=="strTax_ID"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=true;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
      }
      if(val.property=="strVendor_Desc"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=true;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
      }
      
      if(val.property=="intIdCountry_ID.strCountry_Name"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=true;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
      }
      if(val.property=="strProvince"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=true;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=false;
      }
      
      if(val.property=="strDistrict"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=true;
        this.blnfilterstrAddress=false;
      }
      if(val.property=="strAddress"){
        this.txtbuscar='';
        this.blnfilterstrRequis_NO=false;
        this.blnfilterstrTax_ID=false;
        this.blnfilterstrVendor_Desc=false;
        this.blnfilterstrCountry_Name=false;
        this.blnfilterstrProvince=false;
        this.blnfilterstrDistrict=false;
        this.blnfilterstrAddress=true;
      }
    }
    // #region Button Accion 
  
    filterstrVendor_NO(h,{column,$index}){
    if(this.blnfilterstrRequis_NO){
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
  filterstrTax_ID(h,{column,$index}){
    if(this.blnfilterstrTax_ID){
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
  filterstrVendor_Desc(h,{column,$index}){
    if(this.blnfilterstrVendor_Desc){
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
  filterintIdCountry_ID(h,{column,$index}){
    if(this.blnfilterstrCountry_Name){
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
  filterstrProvince(h,{column,$index}){
    if(this.blnfilterstrProvince){
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
  filterstrDistrict(h,{column,$index}){
    if(this.blnfilterstrDistrict){
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
  filterstrAddress(h,{column,$index}){
    if(this.blnfilterstrAddress){
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
  openMessageAlert(strMessage:string){
    this.$message({
        showClose: true,
        type: 'warning',
        message: strMessage
      });
  }
    //#endregion
      data(){
        return{
          gridProveedor:[],
          nameComponent:'modificar-Proveedor',
          selectrowCod:'',
          codigoCompania:'',
          descripcionCompania:'',
          txtbuscar:'',
          titleDescripcion:'',
          tableData:[]
        }
      }
  }