import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import 'element-ui/lib/theme-default/index.css';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
import { Notification } from 'element-ui';
@Component({
  name: 'crear-proveedor'
})
export default class CrearProveedorComponent extends Vue {
 
  dialogVisible:boolean=false;
  SendDocument:boolean=false;
  btnactivarproveedor:boolean=false;
  public Proveedor:ProveedorModel =new ProveedorModel();
  nameTipoJoN:string='';
  VisibleForName:boolean=false;
  ApellidosShow:boolean=false;
//   ****
  AddressCalle:string;
  AddressNumero:string;
  AddressDprto:string;
  AddressOf:string;
  AddressLote:string;
  RucOrDni:string;
  constructor(){
    super();
  }
  selectCategoria(val){
      this.VisibleForName=true;
      if(val==='1'){
        this.nameTipoJoN='Razon social';
        this.RucOrDni='RUC';
        this.ApellidosShow=false;
      }
      if(val==='2'){
        this.nameTipoJoN='Nombres';
        this.RucOrDni='DNI';
        this.ApellidosShow=true;
      }
  }
  SaveProveedor(){
      this.Proveedor.strAddress=this.AddressCalle+' '+this.AddressNumero+' '+this.AddressDprto+' '+this.AddressOf+' '+this.AddressLote
      console.log(this.Proveedor);
      
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
  activar_proveedor(){
    debugger;
    this.btnactivarproveedor=true;
  }
  desactivar_proveedor(){
    debugger;
    this.btnactivarproveedor=false;
  }
  data(){
    return{
      dialogTableVisible: false,
      dialogVisible:false,
      AddressCalle:'',
      AddressNumero:'',
      AddressDprto:'',
      AddressOf:'',
      AddressLote:'',
      RucOrDni:'',
      VisibleForName:false,
      ApellidosShow:false,
      
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
      options: [{
        value: '101',
        label: 'Antapaccay'
      }, {
        value: '102',
        label: 'las bambas'
      }],
      categoria: [{
        value: '1',
        label: 'Juridica'
      }, {
        value: '2',
        label: 'Natural'
      }],
      value: '',
      value1:'',
      data:{
        Usuario:localStorage.getItem('User_Nombre'),
      },
      accesosUser: [],
      hours: 0,
      minutos:0,
      seconds:0
    }
  }
  
}
