import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CostItemModel} from '@/modelo/maestro/costitem';
import costitemService from '@/components/service/costitem.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcostitem'
})

export default class  BCostItemComponent extends Vue {

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

  public tabla:Array<CostItemModel>=[];
  public tabla1:Array<CostItemModel>=[];
  public costitemSelectModel:CostItemModel=new CostItemModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  blnfilterstrCost_Item_Cod:boolean=true;
  blnfilterstrCost_Item_Pos1:boolean=false;
  blnfilterstrCost_Item_Desc1:boolean=false;
  clickColumn:string='';
  Column:string='';

  public search:CostItemModel=new CostItemModel();
  inputAtributo:any;
  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    debugger
    costitemService.GetAllCostItem()
    .then(response=>{
      debugger
      console.log('costitem',response);
      this.tabla=response; 
      this.tabla1=response;       
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

  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  seleccionar(row,index){
    this.$emit('costitemselecionado',row);
  }
  handleCurrentChange(val){
    this.costitemSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('costitemselecionado',this.costitemSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }
  
  filterstrCost_Item_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
  filterstrCost_Item_Pos1(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Pos1){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
  filterstrCost_Item_Desc1(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrCost_Item_Desc1){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CostItemModel();
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
    if(val.property=="strCost_Item_Cod"){
      this.clickColumn=val.property;  
      this.search=new CostItemModel();  
      this.inputAtributo='';  
      this.blnfilterstrCost_Item_Cod=true;
      this.blnfilterstrCost_Item_Pos1=false;
      this.blnfilterstrCost_Item_Desc1=false;
    }
    if(val.property=="strCost_Item_Pos1"){
      this.clickColumn=val.property;
      this.search=new CostItemModel();
      this.inputAtributo='';
      this.blnfilterstrCost_Item_Cod=false;
      this.blnfilterstrCost_Item_Pos1=true;
      this.blnfilterstrCost_Item_Desc1=false;
    }
    if(val.property=="strCost_Item_Desc1"){
      this.clickColumn=val.property;
      this.search=new CostItemModel();
      this.inputAtributo='';
      this.blnfilterstrCost_Item_Cod=false;
      this.blnfilterstrCost_Item_Pos1=false;
      this.blnfilterstrCost_Item_Desc1=true;
    }
  }
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toString().toLowerCase().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }
  buscarfilterCuenta(){
    var input=this.inputAtributo.toLowerCase();
    var data=this.like(this.tabla1,this.clickColumn,input)
   
    this.tabla=[];
    this.tabla=data;
  }
  data() {
    return {
      cuentacontableModel:[],
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
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110100',
      Nombre:'Petty Cash & Imprest',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110101',
      Nombre:'Petty Cash Tintaya',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110102',
      Nombre:'Petty Cash Arequipa',
    },
    {
      Acc_NO_Local :'101000',
      Acct_NO_Corp:'M1110103',
      Nombre:'Petty Cash Matarani',
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
