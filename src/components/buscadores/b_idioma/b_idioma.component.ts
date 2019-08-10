import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {IdiomaModel} from '@/modelo/maestro/idioma';
import idiomaService from '@/components/service/idioma.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bidioma'
})

export default class  BIdiomaComponent extends Vue {

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
  idiomaModel:IdiomaModel[];
  idiomaModel1:IdiomaModel[];
  public idiomaSelectModel:IdiomaModel=new IdiomaModel();
  blnilterstrLenguaje_Cod:boolean=true;
  blnilterstrLenguaje_Desc:boolean=false;
  blnilterstrLocation:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  companyCod:any;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.loadIdioma();
    }, 400)    
  }
  loadIdioma(){
    this.companyCod=localStorage.getItem('compania_cod');
    idiomaService.GetAllIdioma()
    .then(response=>{
      this.idiomaModel=[];       
      this.idiomaModel1=[];       
      this.idiomaModel=response;       
      this.idiomaModel1=response;   
      this.loading1=false;    
    }).catch(error=>{
      this.loading1=false; 
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar los idiomas'
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
    this.$emit('cartaSelecionado',rows[index]);
  }
  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }
  getProveedorSupplier(){
  }
  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
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
  seleccionar(row,index){
    this.$emit('idiomaseleccionado',row);
  }
  checkIdioma(){
    this.$emit('idiomaseleccionado',this.idiomaSelectModel);
  }
  closeIdioma(){
    this.$emit('closeIdioma');
  }  
  handleCurrentChange(val:IdiomaModel){
    this.idiomaSelectModel=val;
  }
  buscarIdioma(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.idiomaModel1,this.clickColumn,this.inputAtributo)
      this.idiomaModel=[];
      this.idiomaModel=data;
    }
   else{
    this.idiomaModel=[];
    this.idiomaModel=this.idiomaModel1;
   }
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strLenguaje_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrLenguaje_Cod=true;
      this.blnilterstrLenguaje_Desc=false;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strLenguaje_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrLenguaje_Cod=false;
      this.blnilterstrLenguaje_Desc=true;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strLocation"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrLenguaje_Cod=false;
      this.blnilterstrLenguaje_Desc=false;
      this.blnilterstrLocation=true;
    }
  }
  filterstrLenguaje_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrLenguaje_Cod){
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
  filterstrLenguaje_Desc(h,{column,$index}){
    if(this.blnilterstrLenguaje_Desc){
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
  filterstrLocation(h,{column,$index}){
    if(this.blnilterstrLocation){
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
      idiomaModel:[],
      idiomaModel1:[],
      inputAtributo:'',
      Column:'',
      companyCod:'',
      loading1:true

    };
  }
}
