import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {GrupoAreaModel} from '@/modelo/maestro/grupoarea';
import grupoareaService from '@/components/service/grupoarea.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bgrupoarea'
})

export default class  BGrupoAreaComponent extends Vue {

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

  public cuentacontableModel:Array<GrupoAreaModel>=[];
  public cuentacontableModel1:Array<GrupoAreaModel>=[];
  public cuentacontableSelectModel:GrupoAreaModel=new GrupoAreaModel();
  blnilterstrCCGrpArea_Cod:boolean=true;
  blnilterstrCCGrpArea_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    grupoareaService.GetAllGrupoArea()
    .then(response=>{
      this.cuentacontableModel=response;       
      this.cuentacontableModel1=response;       
    }).catch(error=>{
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
    this.$emit('grupoareaseleccionado',row);
  }
  handleCurrentChange(val){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('grupoareaseleccionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('grupoareaClose');
  }
  buscarGrupo(){
    var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCCGrpArea_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCCGrpArea_Cod=true;
      this.blnilterstrCCGrpArea_Desc=false;
    }
    if(val.property=="strCCGrpArea_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCCGrpArea_Cod=false;
      this.blnilterstrCCGrpArea_Desc=true;
    }
  }
  filterstrWHS_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCCGrpArea_Cod){
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
  filterstrWHS_Name(h,{column,$index}){
    if(this.blnilterstrCCGrpArea_Desc){
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
      inputAtributo:''
    };
  }
}
