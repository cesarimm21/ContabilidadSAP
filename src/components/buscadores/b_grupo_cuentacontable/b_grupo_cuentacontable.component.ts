import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {GrupoCuentaContableModel} from '@/modelo/maestro/grupocuentacontable';
import grupocuentacontableService from '@/components/service/grupocuentacontable.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bgrupocuentacontable'
})

export default class  BGrupoCuentaContableComponent extends Vue {

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
  public cuentacontableModel:Array<GrupoCuentaContableModel>=[];
  public cuentacontableModel1:Array<GrupoCuentaContableModel>=[];
  public cuentacontableSelectModel:GrupoCuentaContableModel=new GrupoCuentaContableModel();
blnfilterstrGrpAcctCont_Cod:boolean=true;
blnfilterstrGrpAcctCont_Name:boolean=false;
blnfilterstrGrpAcctCont_Desc:boolean=false;
clickColumn:string='';
Column:string='';
public search:GrupoCuentaContableModel=new GrupoCuentaContableModel();
inputAtributo:any;
loading1:boolean=true;
companyCod:any;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    this.companyCod=localStorage.getItem('compania_cod');
    grupocuentacontableService.GetAllGrupoCuentaContable2(this.companyCod)
    .then(response=>{
      this.cuentacontableModel=response;  
      this.cuentacontableModel1=response;
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
    this.$emit('grupocuentacontableselecionado',row);
  }
  handleCurrentChange(val:GrupoCuentaContableModel){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('grupocuentacontableselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }  
  
  filterstrGrpAcctCont_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrGrpAcctCont_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoCuentaContableModel();
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
  filterstrGrpAcctCont_Name(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnfilterstrGrpAcctCont_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoCuentaContableModel();
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
  filterstrGrpAcctCont_Desc(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrGrpAcctCont_Desc){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new GrupoCuentaContableModel();
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
    if(val.property=="strGrpAcctCont_Cod"){
      this.clickColumn=val.property;  
      this.search=new GrupoCuentaContableModel();  
      this.inputAtributo='';  
      this.blnfilterstrGrpAcctCont_Cod=true;
      this.blnfilterstrGrpAcctCont_Name=false;
      this.blnfilterstrGrpAcctCont_Desc=false;
    }
    if(val.property=="strGrpAcctCont_Name"){
      this.clickColumn=val.property;
      this.search=new GrupoCuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrGrpAcctCont_Cod=false;
      this.blnfilterstrGrpAcctCont_Name=true;
      this.blnfilterstrGrpAcctCont_Desc=false;
    }
    if(val.property=="strGrpAcctCont_Desc"){
      this.clickColumn=val.property;
      this.search=new GrupoCuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrGrpAcctCont_Cod=false;
      this.blnfilterstrGrpAcctCont_Name=false;
      this.blnfilterstrGrpAcctCont_Desc=true;
    }
  }
  buscarfilter(){
    if(this.inputAtributo!=''){
      var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
      this.cuentacontableModel=[];
      this.cuentacontableModel=data;
    }
    else{
      this.cuentacontableModel=[];
      this.cuentacontableModel=this.cuentacontableModel1;
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
