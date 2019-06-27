import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {CentroCostosModel} from '@/modelo/maestro/centrocostos';
import centrocostoService from '@/components/service/centrocostos.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bcentrocosto'
})

export default class  BCentroCostoComponent extends Vue {

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

  public centrocostosModel:CentroCostosModel[];
  public centrocostosModel1:CentroCostosModel[];
  public centrocostosSelectModel:CentroCostosModel=new CentroCostosModel();
  blnilterstrCostCenter_NO:boolean=true;
  blnilterstrCostCenter_Name:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();    
  }
  load(){
    centrocostoService.GetAllCentroCostos()
    .then(response=>{
      this.centrocostosModel=[];       
      this.centrocostosModel1=[];       
      this.centrocostosModel=response;       
      this.centrocostosModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo centro costos'
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
    this.$emit('centrocostoselecionado',row);
  }
  
  handleCurrentChange(val:CentroCostosModel){
    this.centrocostosSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('centrocostoselecionado',this.centrocostosSelectModel);
  }
  closePopup(){
    this.$emit('centrocostosclose');
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
  buscarCentro(){
    var data=this.like(this.centrocostosModel1,this.clickColumn,this.inputAtributo)
    this.centrocostosModel=[];
    this.centrocostosModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCostCenter_NO"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCostCenter_NO=true;
      this.blnilterstrCostCenter_Name=false;
    }
    if(val.property=="strCostCenter_Name"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCostCenter_NO=false;
      this.blnilterstrCostCenter_Name=true;
    }
  }
  filterstrCostCenter_NO(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCostCenter_NO){
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
  filterstrCostCenter_Name(h,{column,$index}){
    if(this.blnilterstrCostCenter_Name){
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
      centrocostosModel:[],
      centrocostosModel1:[],
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
        CostCenter_NO:'630207101',
        CostCen_Father_NO:'630207',
        CostCenter_Name:'Perforacion Primaria Ore',
        CostCenter_Desc:'Perforacion Primaria Ore',
        Cat_Code:'01',
      },
      {
        CostCenter_NO:'630207101',
        CostCen_Father_NO:'630207',
        CostCenter_Name:'Perforacion Primaria Waste',
        CostCenter_Desc:'Perforacion Primaria Waste',
        Cat_Code:'01',
      },
      {
        CostCenter_NO:'630207200',
        CostCen_Father_NO:'630207',
        CostCenter_Name:'Disparo Primario Ore',
        CostCenter_Desc:'Disparo Primario Ore',
        Cat_Code:'01',
      },
      {
        CostCenter_NO:'630207301',
        CostCen_Father_NO:'630207',
        CostCenter_Name:'Carguio Waste',
        CostCenter_Desc:'Carguio Waste',
        Cat_Code:'01',
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
