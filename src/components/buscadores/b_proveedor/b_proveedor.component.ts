import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import {ProveedorModel} from '@/modelo/maestro/proveedor';
import proveedorService from '@/components/service/proveedor.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bproveedor'
})

export default class  BProveedorComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 5;
   totalRegistros:number = this.RegistersForPage;
   codigoCompania:any;
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

//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();
  proveedorModel:ProveedorModel[];
  proveedorModel1:ProveedorModel[];
  public proveedorSelectModel:ProveedorModel=new ProveedorModel();

  blnilterstrVendor_NO:boolean=true;
  blnilterstrVendor_Desc:boolean=false;
  blnilterstrCountry:boolean=false;
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
    this.codigoCompania=localStorage.getItem('compania_cod');
    proveedorService.GetProveedoresCompany(this.codigoCompania)
    .then(response=>{
      this.proveedorModel=[];
      this.proveedorModel1=[];
      this.proveedorModel=response;       
      this.proveedorModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar proveedor'
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
  // buscarProveedor(){
  //   this.bind();
  // }
  bind(){
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
    this.$emit('proveedorselecionado',this.proveedorSelectModel);
  }
  handleCurrentChange(val:ProveedorModel){
    this.proveedorSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('proveedorselecionado',this.proveedorSelectModel);
  }
  closePopup(){
    this.$emit('proveedorClose');
  }
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }
  buscarProveedor(){
    var data=this.like(this.proveedorModel1,this.clickColumn,this.inputAtributo)
    this.proveedorModel=[];
    this.proveedorModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strVendor_NO"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrVendor_NO=true;
      this.blnilterstrVendor_Desc=false;
      this.blnilterstrCountry=false;
    }
    if(val.property=="strVendor_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=true;
      this.blnilterstrCountry=false;
    }
    if(val.property=="strCountry"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrVendor_NO=false;
      this.blnilterstrVendor_Desc=false;
      this.blnilterstrCountry=true;
    }
  }
  filterstrVendor_NO(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnilterstrVendor_NO){
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
  filterstrVendor_Desc(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrVendor_Desc){
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
  filterstrCountry(h,{column,$index}){
    debugger;
    
    if(this.blnilterstrCountry){
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
      codigoCompania:'',   
      proveedorModel:[],
      proveedorModel1:[]
    };
  }
}
