import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {DiarioModel} from '@/modelo/maestro/diario';
import diarioService from '@/components/service/diario.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bdiario'
})

export default class  BDiarioComponent extends Vue {

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
  gridModel:DiarioModel[];
  gridModel1:DiarioModel[];
  public diarioSelectModel:DiarioModel=new DiarioModel();
  blnilterstrDaily_Cod:boolean=true;
  blnilterstrDaily_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    diarioService.GetAllDiarios2()
    .then(response=>{
      this.gridModel=[];
      this.gridModel1=[];
      this.gridModel=response;       
      this.gridModel1=response;    
      this.loading1=false;   
    }).catch(error=>{
      this.loading1=false;   
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar los almacenes'
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
  getProveedorSupplier(){}

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
    this.diarioSelectModel=row;
    this.$emit('cuentacontableselecionado',row);
  }
  handleCurrentChange(val){
    this.diarioSelectModel=val;
  }
  checkPopup(){
    this.$emit('cuentacontableselecionado',this.diarioSelectModel);
  }
  closePopup(){
    this.$emit('cuentacontableClose');
  }
  buscarDiario(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.gridModel1,this.clickColumn,this.inputAtributo)
      this.gridModel=[];
      this.gridModel=data;
    }
    else{
      this.gridModel=[];
      this.gridModel=this.gridModel1;
    }
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strDaily_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrDaily_Cod=true;
      this.blnilterstrDaily_Desc=false;
    }
    if(val.property=="strDaily_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrDaily_Cod=false;
      this.blnilterstrDaily_Desc=true;
    }
  }
  filterstrDaily_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrDaily_Cod){
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
  filterstrDaily_Desc(h,{column,$index}){
    if(this.blnilterstrDaily_Desc){
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
      cuentacontableModel:[],
      gridModel:[],
      gridModel1:[],
      inputAtributo:'',
      loading1:true
    };
  }
}
