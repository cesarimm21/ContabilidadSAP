import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import router from '@/router';
import ElementUI from 'element-ui';
import InfiniteScroll from 'vue-infinite-scroll';
import Global from '@/Global';

import paisService from '@/components/service/pais.service';
import bancoService from '@/components/service/banco.service';
import tipodocidentidadService from '@/components/service/tipodocidentidad.service';
import BDocumentoComponent from '@/components/buscadores/b_tipoDocumento/b_tipoDocumento.vue';
import BCompaniaProveedor from '@/components/buscadores/b_compania/b_compania.vue';
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
  export default class ModificarProveedorComponent extends Vue {
    gridProveedor: ProveedorModel[];
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
    selectrowCod:string;
    public gridSelectedProveedor:ProveedorModel=new ProveedorModel;
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
      proveedorSelect(val){
        this.gridSelectedProveedor=val;  
        this.selectrowCod=this.gridSelectedProveedor.strVendor_NO;   
      }
      async EditarProveedor(val){
        await setTimeout(() => {
            debugger;
            if(this.selectrowCod!=''){
              router.push({ path: `/barmenu/FI-FINANZAS/proveedor/ViewAndEdit-proveedor`, query: { vista: 'modificar',data:this.selectrowCod }  })
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