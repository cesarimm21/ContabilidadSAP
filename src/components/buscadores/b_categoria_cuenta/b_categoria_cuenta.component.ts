import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CategoriaCuentaModel} from '@/modelo/maestro/categoriacuenta';
import categoriacuentaService from '@/components/service/categoriacuenta.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcategoriacuenta'
})

export default class  BCategoriaCuentaComponent extends Vue {

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
  categoriacuentaModel:CategoriaCuentaModel[];
  categoriacuentaModel1:CategoriaCuentaModel[];
  public categoriacuentaSelectModel:CategoriaCuentaModel=new CategoriaCuentaModel();
  blnilterstrAcctCateg_Cod:boolean=true;
  blnilterstrAcctCateg_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 400)       
  }
  load(){
    categoriacuentaService.GetAllCategoriaCuenta2()
    .then(response=>{      
      this.categoriacuentaModel=[];       
      this.categoriacuentaModel1=[];       
      this.categoriacuentaModel=response;       
      this.categoriacuentaModel1=response; 
      this.loading1=false;      
    }).catch(error=>{
      this.loading1=false;    
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar categoria cuenta'
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

  seleccionar(row,index){
    this.$emit('categoriacuentaselecionado',row);
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
  

  handleCurrentChange(val:CategoriaCuentaModel){
    this.categoriacuentaSelectModel=val;
  }
  checkPopup(){
    this.$emit('categoriacuentaselecionado',this.categoriacuentaSelectModel);
  }
  closePopup(){
    this.$emit('categoriacuentaclose');
  }
  buscarCategoria(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.categoriacuentaModel1,this.clickColumn,this.inputAtributo)
      this.categoriacuentaModel=[];
      this.categoriacuentaModel=data;
    }
    else{
      this.categoriacuentaModel=[];
      this.categoriacuentaModel=this.categoriacuentaModel1;
    }
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strAcctCateg_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrAcctCateg_Cod=true;
      this.blnilterstrAcctCateg_Desc=false;
    }
    if(val.property=="strAcctCateg_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrAcctCateg_Cod=false;
      this.blnilterstrAcctCateg_Desc=true;
    }
  }
  filterstrAcctCateg_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrAcctCateg_Cod){
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
  filterstrAcctCateg_Desc(h,{column,$index}){    
    if(this.blnilterstrAcctCateg_Desc){
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
      categoriacuentaModel:[],
      categoriacuentaModel1:[],
      inputAtributo:'',
      loading1:true
    }
  }
}
