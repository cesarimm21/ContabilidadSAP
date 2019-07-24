import { Vue, Component } from 'vue-property-decorator'
import axios from 'axios';
import { Loading } from 'element-ui';

import {PlantaModel} from '@/modelo/maestro/planta';
import plantaService from '@/components/service/planta.service';
import { Notification } from 'element-ui';
import router from '@/router';
import Global from '@/Global';
@Component({
  name: 'bplanta'
})

export default class  BPlantaComponent extends Vue {

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
  public plantaModel:Array<PlantaModel>=[];
  public plantaModel1:Array<PlantaModel>=[];
  public plantaSelectModel:PlantaModel=new PlantaModel();
  blnilterstrPlant_Cod:boolean=true;
  blnilterstrPlan_Desc:boolean=false;
  clickColumn:string='';
  Column:string='';
  inputAtributo:any;
  constructor() {
    super();
    this.load();
  }
  load(){
    plantaService.GetAllPlanta2()
    .then(response=>{
      this.plantaModel=response;       
      this.plantaModel1=response;       
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar planta'
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
    this.$emit('plantaselecionado',row);
  }
  handleCurrentChange(val:PlantaModel){
    this.plantaSelectModel=val;
  }
  checkPopup(){
    this.$emit('plantaselecionado',this.plantaSelectModel);
  }
  closePopup(){
    this.$emit('plantaClose');
  }
  buscarPlanta(){
    var data=Global.like(this.plantaModel1,this.clickColumn,this.inputAtributo)
    this.plantaModel=[];
    this.plantaModel=data;
  }
  headerclick(val){
    this.Column=val.label;
    if(val.property=="strPlant_Cod"){
      this.clickColumn=val.property;  
      this.inputAtributo='';  
      this.blnilterstrPlant_Cod=true;
      this.blnilterstrPlan_Desc=false;
    }
    if(val.property=="strPlan_Desc"){
      this.clickColumn=val.property;
      this.inputAtributo='';
      this.blnilterstrPlant_Cod=false;
      this.blnilterstrPlan_Desc=true;
    }
  }
  filterstrPlant_Cod(h,{column,$index}){
    var column1 = column.label; 
    if(this.blnilterstrPlant_Cod){
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
  filterstrPlan_Desc(h,{column,$index}){
    if(this.blnilterstrPlan_Desc){
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
      plantaModel:[],
      plantaModel1:[],
      inputAtributo:''
    };
  }
}
