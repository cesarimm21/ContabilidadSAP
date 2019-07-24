import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {GrupoCompradorModel} from '@/modelo/maestro/grupocomprador';
import grupocompradorService from '@/components/service/grupocomprador.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';

@Component({
  name: 'bgrupocomprador'
})

export default class  BGrupoCompradorComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 100;
   totalRegistros:number = this.RegistersForPage;

   CompleteData:any;
  //Busqueda
  formularioBusqueda:any={
    categoria:'CODIGO',
    descripcion:'',
    cambioPagina:55,};

  numeroPagina:number=20;

  //ComoboBox
  proveedorSupplier:Array<{id_categoria:string,nombre:string}>=[];
  valueCombo:string="";

  //Modelos
  articulos:any =[];
  public grupocompradorModel:Array<GrupoCompradorModel>=[];
  public grupocompradorModel1:Array<GrupoCompradorModel>=[];
  public grupocompradorSelectModel:GrupoCompradorModel=new GrupoCompradorModel();
  blnilterstrGrpPurch_Cod:boolean=true;
  blnilterstrGrpPurch_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  company_cod:any='';
  constructor() {
    super();
    this.load();
  }
  load(){
    this.company_cod=localStorage.getItem('compania_cod');
    grupocompradorService.GetAllGrupoComprador2(this.company_cod)
    .then(response=>{
      this.grupocompradorModel=response;       
      this.grupocompradorModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar grupo comprador'
      });
    })
  }

  redirectLogin(msg){
    Notification.warning(msg)
    window.sessionStorage.clear();
    router.push('/')
  }
  beforeMount(){
    this.getProveedorSupplier()
  }
  cambioPagina(){
    this.articulos = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
  }
  seleccionarProveedor(index, rows){
    this.$emit('grupocompradorseleccionado',rows[index]);
  } 

  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }

  getProveedorSupplier(){  }

  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
  }
  seleccionar(row,index){
    this.$emit('grupocompradorSeleccionado',row);
  }
  getNumberFloat(number){
    var num = parseFloat(number).toFixed(2);
    return num;
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  handleCurrentChange(val:GrupoCompradorModel){
    this.grupocompradorSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('grupocompradorSeleccionado',this.grupocompradorSelectModel);
  }
  closePopup(){
    this.$emit('grupocompradorClose');
  }
  buscarComprador(){
    var data=Global.like(this.grupocompradorModel1,this.clickColumn,this.inputAtributo)
    this.grupocompradorModel=[];
    this.grupocompradorModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strGrpPurch_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrGrpPurch_Cod=true;
      this.blnilterstrGrpPurch_Desc=false;
    }
    if(val.property=="strGrpPurch_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrGrpPurch_Cod=false;
      this.blnilterstrGrpPurch_Desc=true;
    }
  }
  filterstrGrpPurch_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrGrpPurch_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
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
  filterstrGrpPurch_Desc(h,{column,$index}){
    if(this.blnilterstrGrpPurch_Desc){
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
  data() {
    return {
      grupocompradorModel:[],
    }
  }
}
