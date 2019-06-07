import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CategoriaLineaModel} from '@/modelo/maestro/categorialinea';
import categorialineaService from '@/components/service/categorialinea.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcategorialinea'
})

export default class  BCategoriaLineaComponent extends Vue {

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

//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  categorialineaModel:CategoriaLineaModel[];
  categorialineaModel1:CategoriaLineaModel[];
  public categorialineaSelectModel:CategoriaLineaModel=new CategoriaLineaModel();
  blnilterstrCategItem_Cod:boolean=true;
  blnilterstrCategItem_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    categorialineaService.GetAllCategoriaLinea()
    .then(response=>{
      this.categorialineaModel=[];       
      this.categorialineaModel1=[];       
      this.categorialineaModel=response;       
      this.categorialineaModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar categoria linea'
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

  buscarProveedor(){
    this.bind();
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
  
  seleccionar(row,index){
    this.$emit('categorialineaselecionado',row);
  }

  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }


  handleCurrentChange(val:CategoriaLineaModel){
    this.categorialineaSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('categorialineaselecionado',this.categorialineaSelectModel);
  }
  closePopup(){
    this.$emit('categorialineaclose');
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
  buscarCategoria(){
    var data=this.like(this.categorialineaModel1,this.clickColumn,this.inputAtributo)
    this.categorialineaModel=[];
    this.categorialineaModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCategItem_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCategItem_Cod=true;
      this.blnilterstrCategItem_Desc=false;
    }
    if(val.property=="strCategItem_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCategItem_Cod=false;
      this.blnilterstrCategItem_Desc=true;
    }
  }
  filterstrCategItem_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCategItem_Cod){
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
  filterstrCategItem_Desc(h,{column,$index}){
    if(this.blnilterstrCategItem_Desc){
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
      categorialineaModel:[],
      categorialineaModel1:[],
      inputAtributo:'',
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
      CODIGO :'B',
      DESCRIPCION:'BIENES',
    },
    {
      CODIGO :'S',
      DESCRIPCION:'SERVICIOS',
    },
    {
      CODIGO :'C',
      DESCRIPCION:'CONSIGNACION',
    },
    {
      CODIGO :'T',
      DESCRIPCION:'TRASNFERENCIA DE STOCK',
    },
    ]
    };
  }
  created() {
    if(typeof window != 'undefined') {
      this.bind();
    }
  }
}
