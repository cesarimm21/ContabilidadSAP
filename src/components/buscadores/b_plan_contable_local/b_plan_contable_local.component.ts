import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {PlanConLocalModel} from '@/modelo/maestro/plancontlocal';
import plancontableService from '@/components/service/planCuentaContable.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
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

  public cuentacontableModel:Array<PlanConLocalModel>=[];
  public cuentacontableModel1:Array<PlanConLocalModel>=[];
  public cuentacontableSelectModel:PlanConLocalModel=new PlanConLocalModel();
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();  
  blnfilterstrChartAcct_L_Desc:boolean=true;
  blnfilterstrChartAcct_L_Cod:boolean=false;
  
  clickColumn:string='';
  Column:string='';

  public search:PlanConLocalModel=new PlanConLocalModel();
  inputAtributo:any;

  constructor() {
    super();
    setTimeout(() => {
      this.load();
    }, 200)
  }
  load(){
    plancontableService.GetAllPlanCuenta2()
    .then(response=>{
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
      this.search=new PlanConLocalModel();
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
      this.search=new PlanConLocalModel();
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
      this.search=new PlanConLocalModel();  
      this.inputAtributo='';  
      this.blnfilterstrChartAcct_L_Cod=true;
      this.blnfilterstrChartAcct_L_Desc=false;
    }
    if(val.property=="strChartAcct_L_Desc"){
      this.clickColumn=val.property;
      this.search=new PlanConLocalModel();
      this.inputAtributo='';
      this.blnfilterstrChartAcct_L_Cod=false;
      this.blnfilterstrChartAcct_L_Desc=true;
    }
  }
  buscarfilter(){
    var data=Global.like(this.cuentacontableModel1,this.clickColumn,this.inputAtributo)
    this.cuentacontableModel=[];
    this.cuentacontableModel=data;
  }
  data() {
    return {
      cuentacontableModel:[],
      cuentacontableModel1:[],
      inputAtributo:''
    };
  }
}
