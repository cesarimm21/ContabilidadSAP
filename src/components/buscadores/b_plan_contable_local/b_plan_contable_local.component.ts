import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {PlanCuentaModel} from '@/modelo/maestro/plancuenta';
import plancontableService from '@/components/service/planCuentaContable.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bplancontablelocal'
})

export default class  BPlanContableLocalComponent extends Vue {

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

  public cuentacontableModel:Array<PlanCuentaModel>=[];
  public cuentacontableModel1:Array<PlanCuentaModel>=[];
  public cuentacontableSelectModel:PlanCuentaModel=new PlanCuentaModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();  
  blnfilterstrChartAcct_L_Desc:boolean=true;
  blnfilterstrChartAcct_L_Cod:boolean=false;
  
  clickColumn:string='';
  Column:string='';

  public search:PlanCuentaModel=new PlanCuentaModel();
  inputAtributo:any;

  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    debugger
    plancontableService.GetAllPlanCuenta()
    .then(response=>{
      debugger
      console.log('grupogastos',response);
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
    this.$emit('plancuentacontableselecionado',row);
  }
  handleCurrentChange(val){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('plancuentacontableselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('close');
  }

  
  filterstrChartAcct_L_Desc(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrChartAcct_L_Desc){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new PlanCuentaModel();
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
  filterstrChartAcct_L_Cod(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrChartAcct_L_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new PlanCuentaModel();
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
    if(val.property=="strChartAcct_L_Cod"){
      this.clickColumn=val.property;  
      this.search=new PlanCuentaModel();  
      this.inputAtributo='';  
      this.blnfilterstrChartAcct_L_Cod=true;
      this.blnfilterstrChartAcct_L_Desc=false;
    }
    if(val.property=="strChartAcct_L_Desc"){
      this.clickColumn=val.property;
      this.search=new PlanCuentaModel();
      this.inputAtributo='';
      this.blnfilterstrChartAcct_L_Cod=false;
      this.blnfilterstrChartAcct_L_Desc=true;
    }
  }
  like(array, key,keyword) {
    
    var responsearr:any = []
    for(var i=0;i<array.length;i++) {
        if(array[i][key].toLowerCase().toString().indexOf(keyword) > -1 ) {
          responsearr.push(array[i])
      }
    }
    return responsearr
  }
  buscarfilter(){
    var input=this.inputAtributo.toLowerCase();
    var data=this.like(this.cuentacontableModel1,this.clickColumn,input)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }


  data() {
    return {
      cuentacontableModel:[],
      cuentacontableModel1:[],
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
