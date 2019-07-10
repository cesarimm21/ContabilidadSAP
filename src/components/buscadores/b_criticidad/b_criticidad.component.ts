import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';
import {CriticidadModel} from '@/modelo/maestro/criticidad';
import criticidadService from '@/components/service/criticidad.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';

@Component({
  name: 'bcriticidad'
})

export default class  BCriticidadComponent extends Vue {
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
  public criticidadModel:Array<CriticidadModel>=[];
  public criticidadModel1:Array<CriticidadModel>=[];
  public criticidadSelectModel:CriticidadModel=new CriticidadModel();
  blnilterstrCritical_Cod:boolean=true;
  blnilterstrCritical_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    criticidadService.GetAllCriticidad()
    .then(response=>{
      this.criticidadModel=response;       
      this.criticidadModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar clase material'
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
    this.$emit('criticidadseleccionado',rows[index]);
  }

  CerrarVentana(){
    this.$emit('cerrarVentanaRoles', 'Close Dialog');
    this.cleanData();
  }
  cleanData(){
    this.formularioBusqueda.VALUE = '';
  }
  getProveedorSupplier(){ }
  cambioCategoria(value){
    this.formularioBusqueda.proveedorSupplier=value;
  }
  seleccionar(row,index){
    this.$emit('criticidadseleccionado',row);
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
  handleCurrentChange(val:CriticidadModel){
    this.criticidadSelectModel=val;
  }
  checkPopup(){
    debugger;
    this.$emit('criticidadseleccionado',this.criticidadSelectModel);
  }
  closePopup(){
    this.$emit('criticidadClose');
  }
  buscarCriticidad(){
    var data=Global.like(this.criticidadModel1,this.clickColumn,this.inputAtributo)
    this.criticidadModel=[];
    this.criticidadModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strCritical_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrCritical_Cod=true;
      this.blnilterstrCritical_Desc=false;
    }
    if(val.property=="strCritical_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrCritical_Cod=false;
      this.blnilterstrCritical_Desc=true;
    }
  }
  filterstrCritical_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrCritical_Cod){
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
  filterstrCritical_Desc(h,{column,$index}){
    if(this.blnilterstrCritical_Desc){
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
      criticidadModel:[],
      criticidadModel1:[],
      inputAtributo:''
    };
  }
}
