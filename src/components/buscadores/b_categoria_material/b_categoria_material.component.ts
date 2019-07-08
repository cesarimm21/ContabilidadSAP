import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import {CategoriaMaterialModel} from '@/modelo/maestro/categoriamaterial';
import categoriamaterialService from '@/components/service/categoriamaterial.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bcategoriamaterial'
})
export default class  BCategoriaMaterialComponent extends Vue {

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
  public categoriamaterialModel:Array<CategoriaMaterialModel>=[];
  public categoriamaterialModel1:Array<CategoriaMaterialModel>=[];
  public categoriamaterialSelectModel:CategoriaMaterialModel=new CategoriaMaterialModel();
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  blnilterstrCategMat_Cod:boolean=true;
  blnilterstrCategMat_Desc:boolean=false;
  constructor() {
    super();
    this.load();
  }
  load(){
    categoriamaterialService.GetAllCategoriaMaterial()
    .then(response=>{
      this.categoriamaterialModel=response;       
      this.categoriamaterialModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar categoria material'
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
  buscarCategoria(){
    var data=Global.like(this.categoriamaterialModel1,this.clickColumn,this.inputAtributo)
    this.categoriamaterialModel=[];
    this.categoriamaterialModel1=data;
  }
  seleccionarProveedor(index, rows){
    this.$emit('clasematerialseleccionado',rows[index]);
  }
  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }
  getProveedorSupplier(){  }

  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
  }
  seleccionar(row,index){
    this.$emit('categoriamaterialseleccionado',row);
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
  handleCurrentChange(val:CategoriaMaterialModel){
    this.categoriamaterialSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('categoriamaterialseleccionado',this.categoriamaterialSelectModel);
  }
  closePopup(){
    this.$emit('categoriamaterialClose');
  }
  headerclick(val){
    this.Column=val.label;
    this.clickColumn=val.property; 
    if(val.property=="strCategMat_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCategMat_Cod=true;
      this.blnilterstrCategMat_Desc=false;
    }
    if(val.property=="strCategMat_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCategMat_Cod=false;
      this.blnilterstrCategMat_Desc=true;
    }
  }
  filterstrCategMat_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCategMat_Cod){
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
  filterstrCategMat_Desc(h,{column,$index}){
    if(this.blnilterstrCategMat_Desc){
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
      categoriamaterialModel:[],
      categoriamaterialModel1:[],
      inputAtributo:''
    };
  }
}
