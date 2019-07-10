import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';


import {TipoMovimientoModel} from '@/modelo/maestro/tipoMovimiento';
import tipomovimientoService from '@/components/service/tipomovimiento.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'btipomovimiento'
})

export default class  BTipoMovimientoComponent extends Vue {

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
  public tipomovimientoModel:Array<TipoMovimientoModel>=[];
  public tipomovimientoModel1:Array<TipoMovimientoModel>=[];
  public tipomovimientoSelectModel:TipoMovimientoModel=new TipoMovimientoModel();
  blnilterstrTypeMov_Cod:boolean=true;
  blnilterstrTypeMov_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    tipomovimientoService.GetAllTipoMovimiento()
    .then(response=>{
      this.tipomovimientoModel=response;       
      this.tipomovimientoModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar tipo movimiento'
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
    this.$emit('tipomovimientoselecionado',row);
  }
  handleCurrentChange(val:TipoMovimientoModel){
    this.tipomovimientoSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('tipomovimientoselecionado',this.tipomovimientoSelectModel);
  }
  closePopup(){
    this.$emit('tipomovimientoclose');
  }
  buscarTipoM(){
    var data=Global.like(this.tipomovimientoModel1,this.clickColumn,this.inputAtributo)
    this.tipomovimientoModel=[];
    this.tipomovimientoModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strTypeMov_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrTypeMov_Cod=true;
      this.blnilterstrTypeMov_Desc=false;
    }
    if(val.property=="strTypeMov_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrTypeMov_Cod=false;
      this.blnilterstrTypeMov_Desc=true;
    }
  }
  filterstrWHS_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrTypeMov_Cod){
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
    if(this.blnilterstrTypeMov_Desc){
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
      tipomovimientoModel:[],
      tipomovimientoModel1:[],
      inputAtributo:''
      
    };
  }
}
