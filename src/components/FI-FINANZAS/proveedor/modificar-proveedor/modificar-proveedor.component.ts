import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import { Notification } from 'element-ui';
import Global from '@/Global';
import {bus} from '../../../../main';
import proveedorService from '@/components/service/proveedor.service'

@Component({
  name: 'modificar-proveedor'
})
export default class ModificarProveedorComponent extends Vue {
  nameComponent:string;
  dialogVisible:boolean=false;
  btnactivarproveedor:boolean=false;
  public gridProveedor: ProveedorModel =new ProveedorModel();
  public gridSelectedProveedor:ProveedorModel=new ProveedorModel();
  constructor(){
    super();
    Global.nameComponent='modificar-proveedor';
  }
  GetAllProveedor(){
    proveedorService.GetAllProveedor()
    .then(response=>{
      this.gridProveedor=response;  
      this.dialogVisible=true;    
    }).catch(error=>{
      this.$message({
        showClose: true,
        type: 'error',
        message: 'No se pudo cargar lista de proveedores'
      })
    })
  }
  loadProveedores(){
    this.GetAllProveedor();
  }
  activar_proveedor(){
    debugger;
    this.btnactivarproveedor=true;
  }
  desactivar_proveedor(){
    debugger;
    this.btnactivarproveedor=false;
  }
  proveedorSelect(val:ProveedorModel){
    this.gridSelectedProveedor=val;
  }
  proveedorClose(){
    this.dialogVisible=false;
    this.gridSelectedProveedor=new ProveedorModel();
  }
  proveedorCheck(){
    this.dialogVisible=false;
  }
  handleClose(){

  }
  ValEditProveedor(){
    this.$message({
      showClose: true,
      type: 'info',
      message: 'validar proveedor'
    });
  }
  created(){
    debugger;
    bus.$on('EditProveedor',(data)=>{
      if(data===this.nameComponent){
        this.$message({
          showClose: true,
          type: 'info',
          message: 'Acción no permitida'
        });
      }
    })
    bus.$on('ValEditProveedor',(data)=>{
      if(data===this.nameComponent){
       this.ValEditProveedor();
      }
    })
  }
  data(){
    return{
      dialogTableVisible: false,
      nameComponent:'modificar-proveedor',
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

    }
  }
  
}
