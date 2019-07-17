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
  name: 'viewandedit-almacen',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  'bsucursal':BSucursalComponent,
  }
})
export default class ViewAndEditAlmacenComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  textTitle:string='';
  enabledtf:boolean=false;
  public almacen:AlmacenModel=new AlmacenModel();
  public sucursal:SucursalModel=new SucursalModel();
  public gridSucursal:SucursalModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='viewandedit-almacen';
        setTimeout(() => {  
            this.load();
          }, 200)
    }  
    load(){
      this.companyName=localStorage.getItem('compania_name');
      this.companyCod=localStorage.getItem('compania_cod'); 
      this.loadSucursal();
        this.almacen= JSON.parse(this.$route.query.data); 
        var vista=this.$route.query.vista;
        if(vista=='modificar'){
            this.enabledtf=false;
            this.textTitle='Modificar Almacen';
        }
        if(vista=='visualizar'){
            this.enabledtf=true;
            this.textTitle='Visualizar Almacen';
        }
        if(this.almacen.strSubsidiary_Cod!=""){
          var data=Global.like(this.gridSucursal,'strSubsidiary_Cod',this.almacen.strSubsidiary_Cod)
            if(data.length>0&&this.almacen.strSubsidiary_Cod!=""){
              this.sucursal=data[0];
              this.almacen.intIdSubsidiary_ID=this.sucursal.intIdSubsidiary_ID;
              this.almacen.strSubsidiary_Cod=this.sucursal.strSubsidiary_Cod;
              this.almacen.strSubsidiary_Desc=this.sucursal.strSubsidiary_Desc;
            }
        }

    }  
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
    //#region [SUCURSAL]
    desactivar_sucursal(){
      this.buscarSucursal();
      if(this.sucursalVisible){
        this.btnactivarsucursal=false;
      }
  }
  loadSucursal(){
    sucursalService.GetAllsucursal(this.companyCod)
    .then(respo=>{
      this.gridSucursal=respo;      
    })
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
      this.sucursalVisible=false;
    }
    //#endregion
    //#region [PLANTA]
    desactivar_planta(){
      if(this.plantaVisible){
        this.btnactivarplanta=false;
      }
  } 
  activar_planta(){
      setTimeout(() => {
        this.btnactivarsucursal=false;
        this.btnactivarplanta=true;
      }, 120)
    } 
  plantaDialog(){
    this.plantaVisible=true;
  }
    handleClosePlanta(){
      this.plantaVisible=false;
    }
    // plantaSelect(val:PlantaModel){
    //   this.planta=val;
    //   this.almacen.intPlant_ID=this.planta.intPlant_ID;
    //   this.almacen.strPlant_Cod=this.planta.strPlant_Cod;
    //   this.plantaVisible=false;
    // }
    //#endregion
    
    guardarAlmacen(){
      var vista=this.$route.query.vista; 
      if(vista=='modificar'){
        var user:any=localStorage.getItem('User_Usuario');
        var id:any=localStorage.getItem('compania_ID');
        this.almacen.strModified_User=user;
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );     
        if(this.almacen.strWHS_Cod!=''&&this.almacen.strWHS_Desc!=''){
          almacenService.updateAlmacen(this.almacen)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se actualizo Correctamente '+resp
                });
                this.almacen=new AlmacenModel();
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se actualizo correctamente. '+resp;
            }).catch(errorss=>{
              loadingInstance.close();
              this.$message({
                showClose: true,
                  type:'error',
                  message: 'No se actualizo Correctamente '
                });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'No se actualizo Correctamente ';
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
      }else{
        this.$message({
            showClose: true,
            type: 'info',
            message: 'Accion no permitida'
          });
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
            textTitle:'',
            gridSucursal:[]
          }
    }
  
}
