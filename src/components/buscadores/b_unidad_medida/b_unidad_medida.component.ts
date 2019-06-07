import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';


import {UnidadMedidaModel} from '@/modelo/maestro/unidadmedida';
import unidadmedidaService from '@/components/service/unidadmedida.service';
import { Notification } from 'element-ui';
import router from '@/router';
@Component({
  name: 'bunidadmedida'
})

export default class  BUnidadMedidaComponent extends Vue {

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
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  blnilterstrUM_Desc:boolean=false;
  blnilterstrUM_Cod:boolean=true;
  //Modelos
  articulos:any =[];
  gridUM:UnidadMedidaModel[];
  gridUM1:UnidadMedidaModel[];
  public unidadmedidaSelectModel:UnidadMedidaModel=new UnidadMedidaModel();

//   articuloService:ArticuloService=new ArticuloService()
//   //Servicios
//   categoriaService:CategoriaService=new CategoriaService();

  constructor() {
    super();
    this.load();
  }
  load(){
    unidadmedidaService.GetAllUnidadMedida()
    .then(response=>{
      this.gridUM=[];
      this.gridUM1=[];
      this.gridUM=response;       
      this.gridUM1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar unidad medida'
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
    this.$emit('unidadmedidaselecionado',row);
  }
  handleCurrentChange(val:UnidadMedidaModel){
    this.unidadmedidaSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('unidadmedidaselecionado',this.unidadmedidaSelectModel);
  }
  closePopup(){
    this.$emit('unidadmedidaClose');
  }
  buscarUnidadMedida(){
    var data=this.like(this.gridUM1,this.clickColumn,this.inputAtributo)
    this.gridUM=[];
    this.gridUM=data;
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
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strUM_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrUM_Cod=true;
      this.blnilterstrUM_Desc=false;
    }
    if(val.property=="strUM_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrUM_Cod=false;
      this.blnilterstrUM_Desc=true;
    }
  }
  filterstrUM_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrUM_Cod){
      this.Column=column1;
      this.clickColumn=column.property;
      // this.searchMoneda=new MonedaModel();
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
  filterstrUM_Desc(h,{column,$index}){
    if(this.blnilterstrUM_Desc){
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
      gridUM:[],
      gridUM1:[],
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
      CODIGO :'4A',
      DESCRIPCION :'BOBINAS',
    },
    {
      CODIGO :'BJ',
      DESCRIPCION :'BALDE',
    },
    {
      CODIGO :'CEN',
      DESCRIPCION :'CIENTO DE UNIDADES',
    },
    {
      CODIGO :'PK',
      DESCRIPCION :'PAQUETE',
    },
    ]

    };
  }
}
