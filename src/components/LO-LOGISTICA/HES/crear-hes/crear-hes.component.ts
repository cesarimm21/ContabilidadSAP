import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';


import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import { Notification } from 'element-ui';
@Component({
  name: 'crear-hes',
  components:{'buttons-accions':ButtonsAccionsComponent}
})
export default class CrearHesComponent extends Vue {
  timer=0;
  valueSwtch:boolean=false;
  codigoCompania:string;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  //**CENTRO COSTO */
  dialogOrdenC:boolean=false;
  btnactivarOrdenC:boolean=false;

  //**Servicios */
  dialogServicios:boolean=false;
  constructor(){
    super();
  }

  //#region [ORDEN COMPRA]
  loadOrdenC(){
    this.dialogOrdenC=true;
  }
  closeOrdenC(){
    debugger;
    this.btnactivarOrdenC=false;
    this.dialogOrdenC=false;
    return false;
  }
  activar_OrdenC(){
    setTimeout(() => {
      this.btnactivarOrdenC=true;
    }, 120)
  }
  desactivar_OrdenC(){
    debugger;
    if(this.dialogOrdenC){
      this.btnactivarOrdenC=false;
    }
  }
  handleCurrentChange(val){

  }
 
//#endregion

//#region [SERVICIOS]
  closeServicios(){
    this.dialogServicios=false;
  }
  loadServicios(){
    this.dialogServicios=true;
  }
//#endregion
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  data(){
    return{
      dialogTableVisible: false,
      codigoCompania:'',
      options: [{
        value: 'Option1',
        label: 'Option1'
      }, {
        value: 'Option2',
        label: 'Option2'
      }, {
        value: 'Option3',
        label: 'Option3'
      }, {
        value: 'Option4',
        label: 'Option4'
      }, {
        value: 'Option5',
        label: 'Option5'
      }],
      value:'',
      TableIngreso:[{
        cuenta:'0200400701',
        cantidad:'1',
        material:'3,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'CONSTRUCCION DE CENTRO CAPACITACION',
        centro:'46303020'
      },{
        cuenta:'0200400234',
        cantidad:'5',
        material:'3,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'AUDITORIA',
        centro:'46303020'
      },{
        cuenta:'0200400701',
        cantidad:'3',
        material:'3,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'DEPRESACIÓN',
        centro:'46303020'
      },{
        cuenta:'0200400701',
        cantidad:'10',
        material:'2,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'CONTRATACIÓN',
        centro:'46303020'
      },{
        cuenta:'0200400701',
        cantidad:'22',
        material:'12,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'INTEGRACION DE MATERIALES',
        centro:'46303020'
      },{
        cuenta:'0200400701',
        cantidad:'1',
        material:'20,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'CONSTRUCCION DE CENTRO CAPACITACION',
        centro:'46303020'
      },{
        cuenta:'0200400701',
        cantidad:'21',        
        material:'14,000.00',
        moneda:'PEN',
        recurso:'Edwin Gaona',
        descripcion:'CONSTRUCCION DE CENTRO CAPACITACION',
        centro:'46303020'
      }],
      dataOrdenCompra:[{
        codigo:'67000001',
        descripcion:'compra de vienes y servicio'
      },{
        codigo:'45000002',
        descripcion:'compra de vehiculos'
      },{
        codigo:'56000003',
        descripcion:'Fomentar el bienestar'
      },{
        codigo:'67000004',
        descripcion:'Información en radio'
      },{
        codigo:'67000005',
        descripcion:'Vehiculo de carga'
      },{
        codigo:'67000006',
        descripcion:'para navidad'
      }]
    }
  }
  
}
