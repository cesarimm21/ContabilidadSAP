import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import { Notification } from 'element-ui';
import router from '@/router';
import {ImpuestoModel} from '@/modelo/maestro/impuesto';
import impuestoService from '@/components/service/impuesto.service';
import Global from '@/Global';
@Component({
  name: 'bimpuesto'
})

export default class  BImpuestoComponent extends Vue {
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
  impuestoModel:ImpuestoModel[];
  impuestoModel1:ImpuestoModel[];
  public impuestoSelectModel:ImpuestoModel=new ImpuestoModel();
  blnilterstrWH_Cod:boolean=true;
  blnilterstrWH_Desc:boolean=false;
  blnilterfltPorcent:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  loading1:boolean=true;
  constructor() {
    super();    
    setTimeout(() => {
      this.load();
    }, 400)   
  }
  load(){
    impuestoService.GetAllImpuesto()
    .then(response=>{
      this.impuestoModel=[];       
      this.impuestoModel1=[];       
      this.impuestoModel=response;       
      this.impuestoModel1=response;  
      this.loading1=false;     
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar impuesto'
      });
      this.loading1=false;
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
    this.$emit('impuestoseleccionado',rows[index]);
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
  handleCurrentChange(val:ImpuestoModel){
    this.impuestoSelectModel=val;
  }
  seleccionar(row,index){
    this.$emit('impuestoseleccionado',this.impuestoSelectModel);
  }
  checkPopup(){
    this.$emit('impuestoseleccionado',this.impuestoSelectModel);
  }
  closePopup(){
    this.$emit('impuestoClose');
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
  buscarImpuesto(){
    var data=Global.like(this.impuestoModel1,this.clickColumn,this.inputAtributo)
    this.impuestoModel=[];
    this.impuestoModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strWH_Cod"){
      this.clickColumn=val.property;   
      this.inputAtributo='';  
      this.blnilterstrWH_Cod=true;
      this.blnilterstrWH_Desc=false;
      this.blnilterfltPorcent=false;
    }
    if(val.property=="strWH_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWH_Cod=false;
      this.blnilterstrWH_Desc=true;
      this.blnilterfltPorcent=false;
    }
    if(val.property=="fltPorcent"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrWH_Cod=false;
      this.blnilterstrWH_Desc=false;
      this.blnilterfltPorcent=true;
    }
  }
  filterstrWH_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrWH_Cod){
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
  filterstrWH_Desc(h,{column,$index}){
    if(this.blnilterstrWH_Desc){
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
  filterfltPorcent(h,{column,$index}){
    if(this.blnilterfltPorcent){
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
      impuestoModel:[],
      impuestoModel1:[],
      inputAtributo:'',
      loading1:true
    }
  }
}
