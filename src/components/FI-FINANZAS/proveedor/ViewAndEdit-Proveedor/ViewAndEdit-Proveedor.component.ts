import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import Global from '@/Global';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import ButtonsAccionsComponent from '@/components/buttonsAccions/buttonsAccions.vue';
import proveedorService from '@/components/service/proveedor.service';
import {ProveedorModel} from '../../../../modelo/maestro/proveedor';
@Component({
    name: 'ViewAndEdit-Proveedor',
    components:{
      'quickaccessmenu':QuickAccessMenuComponent,
      'buttons-accions':ButtonsAccionsComponent,
    }
  })
  export default class ViewAndEditProveedorComponent extends Vue {
    gridProveedor: ProveedorModel[];
    constructor(){
        super();
        Global.nameComponent='ViewAndEdit-Proveedor';
        this.GetProveedoresCompany(localStorage.getItem('compania_cod'));
    
      }
      GetProveedoresCompany(strCompany_Cod){
        proveedorService.GetProveedoresCompany(strCompany_Cod)
        .then(response=>{
          this.gridProveedor=[];
          this.gridProveedor=response;
          for(var j=0;j<this.gridProveedor.length;j++){
            if(this.gridProveedor[j].strLastName!=null){
              this.gridProveedor[j].strVendor_Desc=this.gridProveedor[j].strVendor_Desc+', '+this.gridProveedor[j].strLastName+' '+this.gridProveedor[j].strSurName
            }        
          }
          for(var i=0;i<100-this.gridProveedor.length;i++){
            var modelpro:ProveedorModel=new ProveedorModel();
            this.gridProveedor.push(modelpro);
          }
          if(response.length>0){
          }          
          else{
            this.$message({
              showClose: true,
              type: 'info',
              message: 'No hay proveedores'
            })
          }
        }).catch(error=>{
          this.$message({
            showClose: true,
            type: 'error',
            message: 'No se pudo cargar lista de proveedores'
          })
        })
      }
      data(){
        return{
          gridProveedor:[],
          nameComponent:'ViewAndEdit-Proveedor',
        }
      }
  }