import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {AlmacenModel} from '@/modelo/maestro/almacen';
import almacenService from '@/components/service/almacen.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'balmacen'
})

export default class  BAlmacenComponent extends Vue {

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

  almacenModel:AlmacenModel[];
  almacenModel1:AlmacenModel[];
  public almacenSelectModel:AlmacenModel=new AlmacenModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();
blnilterstrWHS_Cod:boolean=true;
blnilterstrWHS_Name:boolean=false;
blnilterstrLocation:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.loadCompania();
  }
  loadCompania(){
    almacenService.GetAllAlmacen()
    .then(response=>{
      this.almacenModel=[];       
      this.almacenModel1=[];       
      this.almacenModel=response;       
      this.almacenModel1=response;       
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

  bind(){
    // var query=this.formularioBusqueda.categoria+"like '%"+this.formularioBusqueda.descripcion+"%'";
    // var order="CODIGO asc";

    // var query=this.formularioBusqueda.categoria+" like '%"+this.formularioBusqueda.descripcion+"%'";
    // var order= this.formularioBusqueda.categoria+" asc";
    // var form = {
    //   C_IN:this.numeroPagina,
    //   ID_Q:7,
    //   WHERE_Q:query,
    //   ORDER_BY_Q:order
    // };
    // let loadingInstancePdf = Loading.service({
    //   fullscreen: true ,
    //   spinner: 'el-icon-loading',
    //   text:'Cargando cartas...'
    // });

    // this.articuloService.getArticulosv2(form)
    // .then(response =>{
    //   this.CompleteData = response;
    //   this.totalRegistros = response.length;
    //   this.articulos = this.CompleteData.slice(this.RegistersForPage*(this.pagina-1), this.RegistersForPage*(this.pagina));
    //   loadingInstancePdf.close();
    // })
    // .catch(e =>{
    //   console.log(e);
    //   if(e.response.status === 404){ // token no valido
    //     this.redirectLogin('Tiempo de session a expirado, Vuelva a Iniciar Sesion');
    //   }
    //   else{
    //     this.openMessageError('Error al buscar proveedor');
    //   }
    //   loadingInstancePdf.close();
    // })
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
    this.$emit('almacenseleccionado',row);
  }
  checkCompania(){
    this.$emit('almacenseleccionado',this.almacenSelectModel);
  }
  closeAlmacen(){
    this.$emit('closeAlmacen');
  }
  
  handleCurrentChange(val:AlmacenModel){
    this.almacenSelectModel=val;
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
  buscarAlmacen(){
    var data=this.like(this.almacenModel1,this.clickColumn,this.inputAtributo)
    this.almacenModel=[];
    this.almacenModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strWHS_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrWHS_Cod=true;
      this.blnilterstrWHS_Name=false;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strWHS_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWHS_Cod=false;
      this.blnilterstrWHS_Name=true;
      this.blnilterstrLocation=false;
    }
    if(val.property=="strLocation"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWHS_Cod=false;
      this.blnilterstrWHS_Name=false;
      this.blnilterstrLocation=true;
    }
  }
  filterstrWHS_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrWHS_Cod){
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
    if(this.blnilterstrWHS_Name){
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
  filterstrLocation(h,{column,$index}){
    if(this.blnilterstrLocation){
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
      almacenModel:[],
      almacenModel1:[],
      categorias: [{
        id_categoria:0,
        nombre: 'CODIGO',
        label: 'CODIGO'
      }, {
        id_categoria:1,
        nombre: 'ID',
        label: 'ID'
      },
      {
        id_categoria:2,
        nombre: 'TITULO',
        label: 'TITULO'
      }
    ],
      dataTable:[{
        PLANTA:'PRINCIPAL',
        CODIGO :'ALM01',
        DESCRIPCION:'Almacen principal 1',
        UBICACION:'Almacen Planta',
      },
      {
        PLANTA:'SUCURSAL',
        CODIGO :'ALM02',
        DESCRIPCION:'Almacen principal 2',
        UBICACION:'Almacen Oficina Aqp',
      }
    ]

    };
  }
  created() {
    if(typeof window != 'undefined') {
      this.bind();
    }
  }
}
