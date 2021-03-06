import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CompaniaModel} from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';
import {PrioridadModel} from '@/modelo/maestro/prioridad';
import prioridadService from '@/components/service/prioridad.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bprioridad'
})

export default class  BPrioridadComponent extends Vue {
//PAGINATION
pagina:number =1;
RegistersForPage:number = 5;
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

// public companiaModel:Array<CompaniaModel>[];
public companiaSelectModel:CompaniaModel=new CompaniaModel();

prioridadModel:PrioridadModel[];
prioridadModel1:PrioridadModel[];
public prioridadSelectModel:PrioridadModel=new PrioridadModel();
  blnilterstrPriority_Cod:boolean=true;
  blnilterstrPriority_Name:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
constructor() {
 super();
// this.loadCompania();
setTimeout(() => {
  this.load();
}, 400)
}
load(){
  prioridadService.GetAllPrioridad2()
  .then(response=>{
    this.prioridadModel=[];    
    this.prioridadModel1=[];    
    this.prioridadModel=response;    
    this.prioridadModel1=response; 
    this.loading1=false;
  }).catch(error=>{
    this.$message({
      showClose: true,
      type: 'error',
      message: 'No se pudo cargar proveedores'
    });
    this.loading1=false;
  })
 }
handleCurrentChange(val:PrioridadModel){
 this.prioridadSelectModel=val;
}
checkCompania(){
 this.$emit('companiaSeleccionado',this.companiaSelectModel);
}
closeCompania(){
 this.$emit('companiaClose');
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
 this.$emit('companiaSelecionado',rows[index]);
}
buscarProveedor(){
 this.bind();
}
bind(){
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
 this.$emit('prioridadselecionado',row);
}
checkPopup(){
  this.$emit('prioridadselecionado',this.prioridadSelectModel);
}
closePopup(){
  this.$emit('prioridadclose');
}
buscarPrioridad(){
  if(this.inputAtributo){
    var data=Global.like(this.prioridadModel1,this.clickColumn,this.inputAtributo)
    this.prioridadModel=[];
    this.prioridadModel=data;
  }
  else{
    this.prioridadModel=[];
    this.prioridadModel=this.prioridadModel1;
  }
}
headerclick(val){
  this.Column=val.label;
  if(val.property=="strPriority_Cod"){
    this.clickColumn=val.property;  
    this.inputAtributo='';  
    this.blnilterstrPriority_Cod=true;
    this.blnilterstrPriority_Name=false;
  }
  if(val.property=="strPriority_Name"){
    this.clickColumn=val.property;
    this.inputAtributo='';
    this.blnilterstrPriority_Cod=false;
    this.blnilterstrPriority_Name=true;
  }
}
filterstrPriority_Cod(h,{column,$index}){
  var column1 = column.label; 
  if(this.blnilterstrPriority_Cod){
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
filterstrPriority_Name(h,{column,$index}){
  if(this.blnilterstrPriority_Name){
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
   companiaModel:[],
   inputAtributo:'',
   prioridadModel:[],
   prioridadModel1:[],
   loading1:true
 };

}
created() {
 if(typeof window != 'undefined') {
   this.bind();
 }
}
}
