import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {RubroModel} from '@/modelo/maestro/rubro';
import rubroService from '@/components/service/rubro.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'brubro'
})

export default class  BRubroComponent extends Vue {

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
  public cuentacontableModel:Array<RubroModel>=[];
  public cuentacontableModel1:Array<RubroModel>=[];
  public cuentacontableSelectModel:RubroModel=new RubroModel();
  blnilterstrAcctItem_Cod:boolean=true;
  blnilterstrAcctItem_Name:boolean=false;
  blnilterstrAcctItem_Desc:boolean=false;
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
    rubroService.GetAllRubro2()
    .then(response=>{
      this.cuentacontableModel=response;       
      this.cuentacontableModel1=response;   
      this.loading1=false;    
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar los almacenes'
      });
      this.loading1=false;
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
    this.$emit('rubroselecionado',rows[index]);
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
    this.$emit('rubroselecionado',row);
  }
  handleCurrentChange(val){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('rubroselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('rubroClose');
  }
  buscarRubro(){
    var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strAcctItem_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrAcctItem_Cod=true;
      this.blnilterstrAcctItem_Name=false;
      this.blnilterstrAcctItem_Desc=false;
    }
    if(val.property=="strAcctItem_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrAcctItem_Cod=false;
      this.blnilterstrAcctItem_Name=true;
      this.blnilterstrAcctItem_Desc=false;
    }
    if(val.property=="strAcctItem_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrAcctItem_Cod=false;
      this.blnilterstrAcctItem_Name=false;
      this.blnilterstrAcctItem_Desc=true;
    }
  }
  filterstrAcctItem_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrAcctItem_Cod){
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
  filterstrAcctItem_Name(h,{column,$index}){
    if(this.blnilterstrAcctItem_Name){
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
  filterstrAcctItem_Desc(h,{column,$index}){
    if(this.blnilterstrAcctItem_Desc){
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
      cuentacontableModel1:[],
      inputAtributo:'',
      loading1:true
    };
  }
}
