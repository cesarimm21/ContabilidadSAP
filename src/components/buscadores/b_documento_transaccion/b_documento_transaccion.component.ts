import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {DocumentoTransacionModel} from '@/modelo/maestro/documentotransaccion';
import documentotransaccionService from '@/components/service/documentotransaccion.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bdocumentotransaccion'
})

export default class  BDocumentoTransaccionComponent extends Vue {

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
  public documentotransaccionModel:Array<DocumentoTransacionModel>=[];
  public documentotransaccionModel1:Array<DocumentoTransacionModel>=[];
  public documentotransaccionSelectModel:DocumentoTransacionModel=new DocumentoTransacionModel();
  blnilterstrDoc_Trans_Cod:boolean=true;
  blnilterstrDoc_Trans_Desc:boolean=false;
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
    documentotransaccionService.GetAllDocumentoTransaccion2()
    .then(response=>{
      this.documentotransaccionModel=response;       
      this.documentotransaccionModel1=response;       
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
    this.$emit('documentotransaccionselecionado',row);
  }
  handleCurrentChange(val){
    this.documentotransaccionSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('documentotransaccionselecionado',this.documentotransaccionSelectModel);
  }
  closePopup(){
    this.$emit('documentotransaccionClose');
  }
  buscarDocumento(){
    var data=Global.like(this.documentotransaccionModel1,this.clickColumn,this.inputAtributo)
    this.documentotransaccionModel=[];
    this.documentotransaccionModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strDoc_Trans_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrDoc_Trans_Cod=true;
      this.blnilterstrDoc_Trans_Desc=false;
    }
    if(val.property=="strDoc_Trans_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrDoc_Trans_Cod=false;
      this.blnilterstrDoc_Trans_Desc=true;
    }
  }
  filterstrDoc_Trans_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrDoc_Trans_Cod){
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
  filterstrDoc_Trans_Desc(h,{column,$index}){
    if(this.blnilterstrDoc_Trans_Desc){
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
      documentotransaccionModel:[],
      documentotransaccionModel1:[],
      inputAtributo:''
    };
  }
}
