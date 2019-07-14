import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {AlmacenModel} from '@/modelo/maestro/almacen';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import almacenService from '@/components/service/almacen.service';
import sucursalService from '@/components/service/sucursal.service';
import BSucursalComponent from '@/components/buscadores/b_sucursal/b_sucursal.vue';
import { SucursalModel } from '@/modelo/maestro/sucursal';
@Component({
  name: 'crear-almacen',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bsucursal':BSucursalComponent,
  }
})
export default class CrearAlmacenComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public almacen:AlmacenModel=new AlmacenModel();
  public sucursal:SucursalModel=new SucursalModel();
  gridSucursal:SucursalModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-almacen';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
        this.almacen.strCompany_Cod=this.companyCod;
        this.almacen.strCompany_Name=this.companyName;
        sucursalService.GetAllsucursal(this.almacen.strCompany_Cod)
        .then(respo=>{
          this.gridSucursal=respo;
        })
    }  
    //#region [SUCURSAL]
    buscarSucursal(){
      var data=Global.like(this.gridSucursal,'strSubsidiary_Cod',this.almacen.strSubsidiary_Cod)
      if(data.length>0&&this.almacen.strSubsidiary_Cod!=""){
        this.sucursal=data[0];
        this.almacen.intIdSubsidiary_ID=this.sucursal.intIdSubsidiary_ID;
        this.almacen.strSubsidiary_Cod=this.sucursal.strSubsidiary_Cod;
        this.almacen.strSubsidiary_Desc=this.sucursal.strSubsidiary_Desc;
      }
      else{
        this.sucursal=new SucursalModel();
        this.almacen.intIdSubsidiary_ID=-1;
        this.almacen.strSubsidiary_Cod="";
        this.almacen.strSubsidiary_Desc="";
      }
    }
    desactivar_sucursal(){
      this.buscarSucursal();
      if(this.sucursalVisible){
        this.btnactivarsucursal=false;
      }
  } 
  activar_sucursal(){
      setTimeout(() => {
        this.btnactivarsucursal=true;
        this.btnactivarplanta=false;
      }, 120)
    } 
  sucursalDialog(){
      this.sucursalVisible=true;  
  }
  handleCloseSucursal(){
      this.sucursalVisible=false;
    }
    sucursalSelect(val:SucursalModel){
      this.sucursal=val;  
      this.almacen.intIdSubsidiary_ID=this.sucursal.intIdSubsidiary_ID;
      this.almacen.strSubsidiary_Cod=this.sucursal.strSubsidiary_Cod;     
      this.almacen.strSubsidiary_Desc=this.sucursal.strSubsidiary_Desc;     
      this.sucursalVisible=false;
    }
    //#endregion
    guardarAlmacen(){
      var user:any=localStorage.getItem('User_Usuario');
      var id:any=localStorage.getItem('compania_ID');
      this.almacen.strCreation_User=user;
      this.almacen.intIdCompany_ID=id;

      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
        }
        );     
      if(this.almacen.strWHS_Cod!=''&&this.almacen.strWHS_Desc!=''){
        almacenService.crearAlmacen(this.almacen)
        .then(resp=>{
          loadingInstance.close();
          this.$message({
              showClose: true,
                type: 'success',
                message: 'Se guardo Correctamente '+resp
              });
              this.almacen=new AlmacenModel();
              this.sucursal=new SucursalModel();
              this.issave = true;
              this.iserror = false;
              this.textosave = 'Se guardo correctamente. '+resp;
          }).catch(errorss=>{
            loadingInstance.close();
            this.$message({
              showClose: true,
                type:'error',
                message: 'No se guardo Correctamente '
              });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'No se guardo Correctamente ';
          })
      }
      else{
        this.$message({
            showClose: true,
            type: 'error',
            message: 'Complete datos'
          });
        this.issave = false;
        this.iserror = true;
        this.textosave = 'Complete datos.';
      }     
        
    } 
    fnOcultar(){

    }
    handleChange(value) {
        console.log(value);
      }
      backPage(){
        window.history.back();
      }
      reloadpage(){
        window.location.reload();
      }
    data(){
        return{     
            companyName:'',
            companyCod:'',
            gridSucursal:[]
          }
    }
  
}
