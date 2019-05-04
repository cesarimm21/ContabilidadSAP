
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
  export default class VisualizarProveedorComponent extends Vue {
    gridProveedor: ProveedorModel[];
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    selectrowCod:string;
    codigoCompania:any;
    descripcionCompania:any;
    public gridSelectedProveedor:ProveedorModel=new ProveedorModel;
    constructor(){
        super();
        Global.nameComponent='ViewAndEdit-Proveedor';
        setTimeout(() => {
          this.load();
        }, 200)
      }
      load(){
        this.codigoCompania=localStorage.getItem('compania_cod');
        this.descripcionCompania=localStorage.getItem('compania_name');
        proveedorService.GetProveedoresCompany(this.codigoCompania)
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
      proveedorSelect(val){
        this.gridSelectedProveedor=val;  
        this.selectrowCod=this.gridSelectedProveedor.strVendor_NO;   
      }
      async EditarProveedor(val){
        await setTimeout(() => {
            debugger;
            if(this.selectrowCod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/proveedor/ViewAndEdit-proveedor`, query: { vista: 'visualizar',data:this.selectrowCod }  })
            }
            else{
                this.openMessageWaring('Seleccione un proveedor')
            }
          }, 200)
        }
        openMessageWaring(strMessage:string){
            this.$message({
                showClose: true,
                type: 'warning',
                message: strMessage
              });
          }
      data(){
        return{
          gridProveedor:[],
          nameComponent:'ViewAndEdit-Proveedor',
          selectrowCod:''
        }
      }
  }