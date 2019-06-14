import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CuentaContableModel} from '@/modelo/maestro/cuentacontable';
import cuentacontableService from '@/components/service/cuentacontable.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcuentacontable'
})

export default class  BCuentaContableComponent extends Vue {

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

  gridCuenta:CuentaContableModel[];
  gridCuenta1:CuentaContableModel[];
  public cuentacontableSelectModel:CuentaContableModel=new CuentaContableModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  blnfilterstrAcc_Local_NO:boolean=true;
  blnfilterstrAcc_Corp_NO:boolean=false;
  blnfilterstrAcc_Local_Name:boolean=false;
  clickColumn:string='';
  Column:string='';
  
  public search:CuentaContableModel=new CuentaContableModel();
  inputAtributo:any;

  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 500)
  }
  load(){     
    cuentacontableService.GetAllCuentaContable()
    .then(response=>{      
      this.gridCuenta=[];
      this.gridCuenta1=[];
      this.gridCuenta=response;   
      this.gridCuenta1=response;   
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
    this.$emit('cuentacontableselecionado',this.cuentacontableSelectModel);
  }
  handleCurrentChange(val:CuentaContableModel){
    this.cuentacontableSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('cuentacontableselecionado',this.cuentacontableSelectModel);
  }
  closePopup(){
    this.$emit('cuentacontableClose');
  }

  filterstrAcc_Local_NO(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Local_NO){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
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
  filterstrAcc_Corp_NO(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Corp_NO){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
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
  filterstrAcc_Local_Name(h,{column,$index}){
    debugger;
    var column1 = column.label; 
    if(this.blnfilterstrAcc_Local_Name){
      this.Column=column1;
      this.clickColumn=column.property;
      this.search=new CuentaContableModel();
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
    if(val.property=="strAcc_Local_NO"){
      this.clickColumn=val.property;  
      this.search=new CuentaContableModel();  
      this.inputAtributo='';  
      this.blnfilterstrAcc_Local_NO=true;
      this.blnfilterstrAcc_Corp_NO=false;
      this.blnfilterstrAcc_Local_Name=false;
    }
    if(val.property=="strAcc_Corp_NO"){
      this.clickColumn=val.property;
      this.search=new CuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrAcc_Local_NO=false;
      this.blnfilterstrAcc_Corp_NO=true;
      this.blnfilterstrAcc_Local_Name=false;
    }
    if(val.property=="strAcc_Local_Name"){
      this.clickColumn=val.property;
      this.search=new CuentaContableModel();
      this.inputAtributo='';
      this.blnfilterstrAcc_Local_NO=false;
      this.blnfilterstrAcc_Corp_NO=false;
      this.blnfilterstrAcc_Local_Name=true;
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
    var data=this.like(this.gridCuenta1,this.clickColumn,input)
  
    this.gridCuenta=[];
    this.gridCuenta=data;
  }

  data() {
    return {
      gridCuenta:[],
      gridCuenta1:[],
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
}
