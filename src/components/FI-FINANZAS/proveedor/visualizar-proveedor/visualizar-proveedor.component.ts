import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import { Notification } from 'element-ui';
import proveedorService from '@/components/service/proveedor.service';
import Global from '@/Global';
import {bus} from '../../../../main';
@Component({
  name: 'visualizar-proveedor'
})
export default class VisualizarProveedorComponent extends Vue {
  nameComponent:boolean=false;
  dialogVisible:boolean=false;
  btnactivarproveedor:boolean=false;
  public gridProveedor: ProveedorModel =new ProveedorModel();
  public gridSelectedProveedor:ProveedorModel=new ProveedorModel();
  constructor(){
    super();
    Global.nameComponent='visualizar-proveedor';
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
  ValViewProveedor(){
    this.$message({
      showClose: true,
      type: 'info',
      message: 'Ver Proveedor'
    });
  }
  created(){
    debugger;
    bus.$on('ViewProveedor',(data)=>{
      if(data===this.nameComponent){
        this.$message({
          showClose: true,
          type: 'info',
          message: 'Acción no permitida'
        });
      }
    })
    bus.$on('ValViewProveedor',(data)=>{
      if(data===this.nameComponent){
       this.ValViewProveedor();
      }
    })
  }

  data(){
    return{
      dialogTableVisible: false,
      nameComponent:'visualizar-proveedor',
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
