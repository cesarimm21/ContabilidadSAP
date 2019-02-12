import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
import BProveedorComponent from '@/components/buscadores/b_proveedor/b_proveedor.vue';
import BAlmacenComponent from '@/components/buscadores/b_almacen/b_almacen.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css';
import axios from 'axios';
import { Loading } from 'element-ui';
import { mixin as focusMixin }  from 'vue-focus';
// import '../../../../assets/css/excel-2007.scss';
import documentService from '@/components/service/documents.service';
import msmsendService from '@/components/service/msnSend.service';
import historialService from '@/components/service/historial.service';
import inicioService from '@/components/service/inicio.service';


import Handsontable from 'handsontable-pro';

import { Notification } from 'element-ui';
Vue.directive('focus', {
  inserted: function(el) {
    el.focus()
  }
})
var EditableColumn = {
  template: '#editable-column-content',
  props: ['is-editing', 'scope', 'editing', 'on-blur', 'on-enter', 'property']
}
@Component({
  name: 'crear-pr',
  components:{
    'bcompania':BCompaniaProveedor,
    'bproveedor':BProveedorComponent,
    'balmacen':BAlmacenComponent,
    'buttons-accions':ButtonsAccionsComponent
  } ,
})
export default class CrearPRComponent extends Vue {
  timer=0;
  sizeScreen:string = (window.innerHeight - 420).toString();//'0';
  sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  
  hours:number;
  minutos:number;
  seconds:number;
  user:any;
  tiempoagotado:any;
  contador:any=0;
  _10min:boolean=false;
  ocultarConfig:boolean = true;
  nameuser:string;
  namecomplete:string;
  accesosUser:any=[];
  ocultar:boolean=false;
  dialogVisible:boolean=false;
  SendDocument:boolean=false;

  /*dialog*/
  dialogCompania:boolean=false;
  dialogProveedor:boolean=false;
  dialogAlmacen:boolean=false;

  /*input*/
  btnactivarcompania:boolean=false;
  btnactivarproveedor:boolean=false;
  btnactivaralmacen:boolean=false;

  /*bolean_tabla_dinamica*/
  bln_tbl_categoria_cuenta:boolean=false;

  /*tabla*/
  editing:any= {
    row:'',
    column:''
  };

  constructor(){
    super();
  }
  fnOcultar(){
    this.ocultar=!this.ocultar;
  }
  guardar(){
    this.SendDocument=true;
  }
  
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  openMessageError(strMessage:string){
    this.$message({
        showClose: true,
        type: 'error',
        message: strMessage
      });
  }
  linkLogout(){
   localStorage.clear();
   window.sessionStorage.clear();
    router.push('/')
  }
  confirmaraceptar(){
    this.SendDocument=false;
  }
  linksUser(comand){
    router.push('/barmenu/'+comand)
  }
  linksLogin(){
    router.push('/inicio')
  }
  linkRoute(route){
    router.push(route)
  }
  redirectLogin(msg){
    Notification.warning(msg)
    localStorage.clear();
    router.push('/')
  }
  calcular(temp){
    if(temp < 600){
      return { rojo: true,}
    }
    else{
      return { verde: true, }
    }
  }
  loadCompania(){
    this.dialogCompania=true;
  }
  loadProveedores(){
    this.dialogProveedor=true;      
  }
  loadAlmacen(){
    this.dialogAlmacen=true;
  }
  handleClose(){
    // this.$confirm('This will permanently delete the file. Continue?', 'Warning', {
    //     confirmButtonText: 'OK',
    //     cancelButtonText: 'Cancel',
    //     type: 'warning'
    //   }).then(() => {
    //     this.$message({
    //       type: 'success',
    //       message: 'Delete completed'
    //     });
    //   }).catch(() => {
    //     this.$message({
    //       type: 'info',
    //       message: 'Delete canceled'
    //     });          
    //   });
  }
  tableRowClassName(row, rowIndex) {
      debugger;
    // if (row === undefined || row.EstadoAprobacion === undefined) return '';
    // if (row.EstadoAprobacion === 'R'){
    //   return 'rechazado-row';
    // } else if (row.EstadoAprobacion === 'A') {
    //   return 'aprobado-row';
    // } else if (row.EstadoAprobacion === 'M'){
    //   return 'modificado-row';
    // }
    // return '';
  }
  handleCurrentChange(val) {
    debugger;
    if(val.date){
        return 'selected-row';
    }
  }
  /*Compania imput*/
  activar_compania(){
    setTimeout(() => {
      this.btnactivarcompania=true;
      this.btnactivaralmacen=false;
      this.btnactivarproveedor=false;
    }, 120)
  }
  desactivar_compania(){
    debugger;
    if(this.dialogCompania){
      this.btnactivarcompania=false;
    }
  }
  closeCompania(){
    debugger;
    this.btnactivarcompania=false;
    return false;
  }

  /*Proveedor imput*/
  activar_proveedor(){
    setTimeout(() => {
      this.btnactivarproveedor=true;
      this.btnactivarcompania=false;
      this.btnactivaralmacen=false;
    }, 120)
  }
  desactivar_proveedor(){
    debugger;
    if(this.dialogProveedor){
      this.btnactivarproveedor=false;
    }
  }
  closeProveedor(){
    debugger;
    this.btnactivarproveedor=false;
    return false;
  }

  /*Almacen imput*/
  activar_almacen(){
    setTimeout(() => {
      console.log("activar_almacen");
      this.btnactivaralmacen=true;
      this.btnactivarcompania=false;
      this.btnactivarproveedor=false;
    }, 120)
  }
  desactivar_almacen(){
    debugger;
    if(this.dialogAlmacen){
      this.btnactivaralmacen=false;
    }
  }
  closeAlmacen(){
    debugger;
    console.log("closeAlmacen");
    this.btnactivaralmacen=false;
    return false;
  }
  activar_descripcion(){
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }
  activar_tipo_requisicion(){
    debugger;
    console.log("activar_tipo_requisicion");
    this.btnactivaralmacen=false;
    this.btnactivarproveedor=false;
    this.btnactivarcompania=false
  }

  /*tabla metodos*/
  handleBlur(event) {
    debugger;
    this.bln_tbl_categoria_cuenta=false;
    event.edit=false;
    this.editing.row='';
    this.editing.column='';
    console.log('blur');
  }
  isEditing() {
    return this.editing !== null
  }
  onCellBlur(row, column, cell, event) {
    debugger;
    this.editing = null
    console.log('onCellBlur',row, column, cell, event);
  }
  onCellClick(row, column, cell, event) {
    this.editing = {
      row,
      column,
      cell
    }
  }
  alerta(event,edit,column){
    debugger;
    this.bln_tbl_categoria_cuenta=true;
    event.edit=!edit;
    this.editing.row=event;
    this.editing.column=column;
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      tableData: [{
        date: '0001',
        name: 'Ferreyros'
      }, {
        date: '0002',
        name: 'Yura SAC'
      }, {
        date: '0003',
        name: 'Signal company'
      }, {
        date: '0004',
        name: 'Cruz del Sur'
      }
      , {
        date: '0005',
        name: 'Tisur'
      }, {
        date: '0006',
        name: 'Seguro'
      }, {
        date: '0007',
        name: 'Cruz del Sur'
      }, {
        date: '0008',
        name: 'Cruz del Sur'
      }, {
        date: '0009',
        name: 'Cruz del Sur'
      }, {
        date: '0010',
        name: 'Linea'
      }, {
        date: '0011',
        name: 'Cruz del Sur'
      }],
      user: {
        authenticated: false
      },
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
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
      value: '',
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
