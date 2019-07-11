import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {MonedaModel} from '@/modelo/maestro/moneda';
import monedaService from '@/components/service/moneda.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';

@Component({
  name: 'bmoneda'
})

export default class  BMonedaComponent extends Vue {

   //PAGINATION
   pagina:number =1;
   RegistersForPage:number = 100;
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
  blnilterstrCurrency_Cod:boolean=true;
  blnilterstrCurrency_Desc:boolean=false;
  blnilterstrCountry:boolean=false;
  public searchMoneda:MonedaModel=new MonedaModel();
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();
  public monedaData:Array<MonedaModel>=[];
  public monedaData1:Array<MonedaModel>=[];
  public monedaSelectModel:MonedaModel=new MonedaModel();
  loading1:boolean=true;
  constructor() {
    super();
    setTimeout(() => {      
      this.load();
    }, 600)   
  }
  load(){
    monedaService.GetAllMoneda()
    .then(response=>{
      this.monedaData=[];
      this.monedaData1=[];
      this.monedaData=response;       
      this.monedaData1=response;   
      this.loading1=false;    
    }).catch(error=>{
      this.loading1=false;
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar moneda'
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
    var data=Global.like(this.monedaData1,this.clickColumn,this.inputAtributo)
    this.monedaData=[];
    this.monedaData=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCurrency_Cod"){
      this.clickColumn=val.property;  
      this.searchMoneda=new MonedaModel();  
      this.inputAtributo='';  
      this.blnilterstrCurrency_Cod=true;
      this.blnilterstrCurrency_Desc=false;
      this.blnilterstrCountry=false;
    }
    if(val.property=="strCurrency_Desc"){
      this.clickColumn=val.property;
      this.searchMoneda=new MonedaModel();
      this.inputAtributo='';
      this.blnilterstrCurrency_Cod=false;
      this.blnilterstrCurrency_Desc=true;
      this.blnilterstrCountry=false;
    }
    if(val.property=="strCountry"){
      this.clickColumn=val.property;
      this.searchMoneda=new MonedaModel();
      this.inputAtributo='';
      this.blnilterstrCurrency_Cod=false;
      this.blnilterstrCurrency_Desc=false;
      this.blnilterstrCountry=true;
    }
  }
  filterstrCurrency_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCurrency_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      this.searchMoneda=new MonedaModel();
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
  filterstrCurrency_Desc(h,{column,$index}){
    if(this.blnilterstrCurrency_Desc){
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
        message: 'No se puede cargar lista Moneda'
      });
  }
  seleccionar(val:MonedaModel){
    this.monedaSelectModel=val;
    this.$emit('MonedaSeleccionado',this.monedaSelectModel);
      this.$emit('monedaselecionado',this.monedaSelectModel);
    // }
  }
  handleCurrentChange(val:MonedaModel){
    this.monedaSelectModel=val;
  }
  checkMoneda(){
    this.$emit('MonedaSeleccionado',this.monedaSelectModel)

    if(Global.nameComponent=='pagos-individual'){
      this.$emit('monedaselecionado',this.monedaSelectModel);
    }
  }
  closeMoneda(){
    this.$emit('closeMoneda');
  }
  data() {
    return {
      monedaData:[],
      monedaData1:[],
      inputAtributo:'',
      loading1:true
    };
  }
}
