import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import { Loading } from 'element-ui';
import {MetodoValuacionModel} from '@/modelo/maestro/metodovaluacion';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import metodoService from '@/components/service/metodo_eva.service';
@Component({
  name: 'crear-metodo-servicio',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearMetodoEvaComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  companyName:any;
  companyCod:any;
  public metodo:MetodoValuacionModel=new MetodoValuacionModel();
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  btnactivarsucursal:boolean=false;
  btnactivarplanta:boolean=false;
  plantaVisible:boolean=false;
  sucursalVisible:boolean=false;
  constructor(){    
        super();
        Global.nameComponent='crear-metodo-eva';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
    }  
    
    guardarComprobante(){
      var user:any=localStorage.getItem('User_Usuario');
      var id:any=localStorage.getItem('compania_ID');
      this.metodo.strCreation_User=user;
      this.issave=false;
      this.iserror = false;
      this.textosave='';
    
      if(this.metodo.strValMeth_Cod==''){ this.$message('Complete los campos obligatorios');return false;}
      if(this.metodo.strValMeth_Desc==''){ this.$message('Complete los campos obligatorios');return false;}  
      else{
        
        let loadingInstance = Loading.service({
          fullscreen: true,
          text: 'Guardando...',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.8)'
          }
          );     
        if(this.metodo.strValMeth_Cod!=''&&this.metodo.strValMeth_Desc!=''){     
          this.metodo.strCompany_Cod=this.companyCod;
          this.metodo.strCompany_Desc=this.companyName;

          metodoService.getMetodoValuacionsOne(this.companyCod,this.metodo.strValMeth_Cod)
          .then(resps=>{
            debugger;
            if(resps.length===0){
              metodoService.createtblMetodoValuacion(this.metodo)
              .then(resp=>{
                loadingInstance.close();
                this.$message({
                    showClose: true,
                      type: 'success',
                      message: 'Se guardo Correctamente '+resp
                    });
                    this.metodo=new MetodoValuacionModel();
                    this.issave = true;
                    this.iserror = false;
                    this.textosave = 'Se guardo correctamente. '+resp;
                }).catch(errorss=>{
                  loadingInstance.close();
                  this.$message({
                    showClose: true,
                      type:'error',
                      message: 'El metodo de evaluacion ya existe en la base de datos '
                    });
                    this.issave = false;
                    this.iserror = true;
                    this.textosave = 'El metodo de evaluacion ya existe en la base de datos ';
              })
            }
            else{
              loadingInstance.close();
              this.$message({
                showClose: true,
                type: 'error',
                message: 'El registro ya existe'
              });
              this.issave = false;
              this.iserror = true;
              this.textosave = 'El registro ya existe';
            }
          })
        }
        else{
          loadingInstance.close();
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
            companyCod:''
          }
    }
  
}
