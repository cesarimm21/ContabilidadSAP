import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {ClaseMaterialModel} from '@/modelo/maestro/clasematerial';
import clasematerialService from '@/components/service/clasematerial.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bclasematerial'
})

export default class  BClaseMaterialComponent extends Vue {
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
  public clasematerialModel:Array<ClaseMaterialModel>=[];
  public clasematerialModel1:Array<ClaseMaterialModel>=[];
  public clasematerialSelectModel:ClaseMaterialModel=new ClaseMaterialModel();
  blnilterstrMatClass_Cod:boolean=true;
  blnilterstrExp_Cod_Loc:boolean=false;
  blnilterstrMatClass_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  company_cod:any='';
  constructor() {
    super();
    this.load();
  }
  load(){
    debugger;
    this.company_cod=localStorage.getItem('compania_cod');
    clasematerialService.GetAllClaseMaterial2(this.company_cod)
    .then(response=>{
      this.clasematerialModel=response;       
      this.clasematerialModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar clase material'
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
    this.$emit('clasematerialseleccionado',rows[index]);
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
  handleCurrentChange(val:ClaseMaterialModel){
    this.clasematerialSelectModel=val;
  }
  seleccionar(row,index){
    this.$emit('clasematerialseleccionado',row);
  }
  getNumberFloat(number){
    var num = parseFloat(number).toFixed(2);
    return num;
  }  
  checkPopup(){
    this.$emit('clasematerialseleccionado',this.clasematerialSelectModel);
  }
  closePopup(){
    this.$emit('clasematerialClose');
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  buscarClaseMaterial(){
    alert('aqui')
    var data=Global.like(this.clasematerialModel1,this.clickColumn,this.inputAtributo)
    this.clasematerialModel=[];
    this.clasematerialModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    this.clickColumn=val.property; 
    if(val.property=="strMatClass_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrMatClass_Cod=true;
      this.blnilterstrExp_Cod_Loc=false;
      this.blnilterstrMatClass_Desc=false;
    }
    if(val.property=="strExp_Cod_Loc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrMatClass_Cod=false;
      this.blnilterstrExp_Cod_Loc=true;
      this.blnilterstrMatClass_Desc=false;
    }
    if(val.property=="strMatClass_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrMatClass_Cod=false;
      this.blnilterstrExp_Cod_Loc=false;
      this.blnilterstrMatClass_Desc=true;
    }
  }
  filterstrMatClass_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrMatClass_Cod){
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
  filterstrExp_Cod_Loc(h,{column,$index}){
    if(this.blnilterstrExp_Cod_Loc){
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
  filterstrMatClass_Desc(h,{column,$index}){
    if(this.blnilterstrMatClass_Desc){
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
      clasematerialModel:[],
      clasematerialModel1:[],
      inputAtributo:''
      };
  }
}
