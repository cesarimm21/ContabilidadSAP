import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {ComponenteCuentaContableModel} from '@/modelo/maestro/componentecuentacontable';
import componentecuentacontableService from '@/components/service/componentecuentacontable.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcomponentecuentacontable'
})

export default class  BComponenteCuentaContableComponent extends Vue {

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
  public tabla:Array<ComponenteCuentaContableModel>=[];
  public tabla1:Array<ComponenteCuentaContableModel>=[];
  public costitemSelectModel:ComponenteCuentaContableModel=new ComponenteCuentaContableModel();
  blnfilterstrComp_Cod:boolean=true;
  blnfilterstrComp_Name:boolean=false;
  blnfilterstrComp_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  public search:ComponenteCuentaContableModel=new ComponenteCuentaContableModel();
  inputAtributo:any;
  company_cod:any='';
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.company_cod=localStorage.getItem('compania_cod');
    componentecuentacontableService.GetAllComponenteCuentaContable2(this.company_cod)
    .then(response=>{
      this.tabla=response; 
      this.tabla1=response;    
      this.loading1=false;   
    }).catch(error=>{
      this.loading1=false;   
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar  '
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
  getProveedorSupplier(){ }
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
    this.$emit('componenteselecionado',row);
  }
  handleCurrentChange(val){
    this.costitemSelectModel=val;
  }
  checkPopup(){
    this.$emit('componenteselecionado',this.costitemSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }  
  filterstrComp_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrComp_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new ComponenteCuentaContableModel();
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
  filterstrComp_Name(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrComp_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new ComponenteCuentaContableModel();
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
  filterstrComp_Desc(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrComp_Desc){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new ComponenteCuentaContableModel();
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
    if(val.property=="strComp_Cod"){
      this.clickColumn=val.property;  
      this.search=new ComponenteCuentaContableModel();  
      this.inputAtributo='';  
      this.blnfilterstrComp_Cod=true;
      this.blnfilterstrComp_Name=false;
      this.blnfilterstrComp_Desc=false;
    }
    if(val.property=="strComp_Name"){
      this.clickColumn=val.property;
      this.search=new ComponenteCuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrComp_Cod=false;
      this.blnfilterstrComp_Name=true;
      this.blnfilterstrComp_Desc=false;

    }
    if(val.property=="strComp_Desc"){
      this.clickColumn=val.property;
      this.search=new ComponenteCuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrComp_Cod=false;
      this.blnfilterstrComp_Name=false;
      this.blnfilterstrComp_Desc=true;
    }
  }
  buscarfilterCuenta(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.tabla1,this.clickColumn,this.inputAtributo)
      this.tabla=[];
      this.tabla=data;
    }
    else{
      this.tabla=[];
      this.tabla=this.tabla1;
    }
    
  }
  data() {
    return {
      cuentacontableModel:[],
      tabla:[],
      tabla1:[],
      loading1:true
    };
  }
}
