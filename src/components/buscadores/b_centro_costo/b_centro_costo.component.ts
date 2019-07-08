import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import centrocostoService from '@/components/service/centrocostos.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcentrocosto'
})

export default class  BCentroCostoComponent extends Vue {

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
  public centrocostosModel:CentroCostosModel[];
  public centrocostosModel1:CentroCostosModel[];
  public centrocostosSelectModel:CentroCostosModel=new CentroCostosModel();
  blnilterstrCostCenter_NO:boolean=true;
  blnilterstrCostCenter_Name:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();    
  }
  load(){
    centrocostoService.GetAllCentroCostos()
    .then(response=>{
      this.centrocostosModel=[];       
      this.centrocostosModel1=[];       
      this.centrocostosModel=response;       
      this.centrocostosModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo centro costos'
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
  getProveedorSupplier(){  }
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
    this.$emit('centrocostoselecionado',row);
  }
  
  handleCurrentChange(val:CentroCostosModel){
    this.centrocostosSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('centrocostoselecionado',this.centrocostosSelectModel);
  }
  closePopup(){
    this.$emit('centrocostosclose');
  }
  buscarCentro(){
    var data=Global.like(this.centrocostosModel1,this.clickColumn,this.inputAtributo)
    this.centrocostosModel=[];
    this.centrocostosModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCostCenter_NO"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCostCenter_NO=true;
      this.blnilterstrCostCenter_Name=false;
    }
    if(val.property=="strCostCenter_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Name=true;
    }
  }
  filterstrCostCenter_NO(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCostCenter_NO){
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
  filterstrCostCenter_Name(h,{column,$index}){
    if(this.blnilterstrCostCenter_Name){
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
      centrocostosModel:[],
      centrocostosModel1:[],
      inputAtributo:'',
  };
  }
}
