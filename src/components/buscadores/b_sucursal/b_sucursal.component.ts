import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import {SucursalModel} from '@/modelo/maestro/sucursal';
import sucursalService from '@/components/service/sucursal.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bsucursal'
})

export default class  BSucursalComponent extends Vue {

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
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();
  public gridSucursal:Array<SucursalModel>=[];
  public gridSucursal1:Array<SucursalModel>=[];
  public sucursalSelect:SucursalModel=new SucursalModel();
  blnilterstrSubsidiary_Cod:boolean=true;
  blnilterstrSubsidiary_Desc:boolean=false;
  blnilterstrSubsidiary_Address:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    sucursalService.GetAllsucursal()
    .then(response=>{
        this.gridSucursal=[];
        this.gridSucursal1=[];
      this.gridSucursal=response;       
      this.gridSucursal1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar planta'
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
    this.$emit('sucursalselecionado',row);
  }

  handleCurrentChange(val:SucursalModel){
    this.sucursalSelect=val;
  }
  checkPopup(){
    this.$emit('sucursalselecionado',this.sucursalSelect);
  }
  closePopup(){
    this.$emit('sucursalClose');
  }
  buscarSucursal(){
    var data=Global.like(this.gridSucursal1,this.clickColumn,this.inputAtributo)
    this.gridSucursal=[];
    this.gridSucursal=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strSubsidiary_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrSubsidiary_Cod=true;
      this.blnilterstrSubsidiary_Desc=false;
      this.blnilterstrSubsidiary_Address=false;
    }
    if(val.property=="strSubsidiary_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrSubsidiary_Cod=false;
      this.blnilterstrSubsidiary_Desc=true;
      this.blnilterstrSubsidiary_Address=false;
    }
    if(val.property=="strSubsidiary_Address"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrSubsidiary_Cod=false;
      this.blnilterstrSubsidiary_Desc=false;
      this.blnilterstrSubsidiary_Address=true;
    }
  }
  filterstrSubsidiary_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrSubsidiary_Cod){
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
  filterstrSubsidiary_Desc(h,{column,$index}){
    if(this.blnilterstrSubsidiary_Desc){
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
  filterstrSubsidiary_Address(h,{column,$index}){
    if(this.blnilterstrSubsidiary_Address){
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
        gridSucursal:[],
        gridSucursal1:[],
        inputAtributo:''
    };
  }
}
