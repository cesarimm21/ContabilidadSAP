import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
import {PeriodoModel} from '@/modelo/maestro/periodo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import periodoService from '@/components/service/periodo.service';
@Component({
  name: 'crear-periodo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class ModificarAlmacenComponent extends Vue {
    sizeScreen:string = (window.innerHeight - 420).toString();//'0';
    sizeScreenwidth:string = (window.innerWidth-288 ).toString();//'0';
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public periodo:PeriodoModel=new PeriodoModel();
  gridPeriodo:PeriodoModel[];
  issave:boolean=false;
  iserror:boolean=false;
  textosave:string='';
  constructor(){    
        super();
        Global.nameComponent='crear-periodo';
        setTimeout(() => {
            this.load();
          }, 200)
    }  
    load(){
        this.companyName=localStorage.getItem('compania_name');
        this.companyCod=localStorage.getItem('compania_cod');  
        this.value3=(new Date()).toString(); 
        
    }
    changeyear(){
        var dateString = new Date(this.value3);      
        var yyyy=dateString.getFullYear();
        periodoService.ConsulaLista(yyyy)
        .then(response=>{
            this.gridPeriodo=[];
            this.gridPeriodo=response;           
        })
    }
    getDateStringView(fecha:string){
        var dateString = new Date(fecha);
        var dia = dateString.getDate();
        var mes = (dateString.getMonth()<12) ? dateString.getMonth()+1 : mes = dateString.getMonth();
        var yyyy = dateString.getFullYear();
        var dd = (dia<10) ? '0'+dia : dd=dia;
        var mm = (mes<10) ? '0'+mes : mm=mes;
        return dd+'.'+mm+'.'+yyyy;
    }

    changeStatus(val){
        var dateString = new Date(this.value3);
        var yyyy=dateString.getFullYear();
        var user:any=localStorage.getItem('User_Usuario');
        this.periodo=val;
        this.periodo.strModified_User=user
        if(val.chrStatus=='A')
        {
            this.periodo.chrStatus='C';
        }
        else{
            this.periodo.chrStatus='A';
        }
        
        if(this.periodo.intIdPayRun_Period!=-1){
            periodoService.updatePeriodo(this.periodo)
            .then(response=>{
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se guardo Correctamente '
                });
                setTimeout(() => {
                    this.changeyear();
                  }, 300)                
                this.issave = true;
                this.iserror = false;
                this.textosave = 'Se guardo correctamente. ';
            }).catch(error=>{
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo cambiar'
                  });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al cambiar.';
            })
        }
        
    }
    // guardarPeriodo(){
    //   var dateString = new Date(this.value3);
    //   var yyyy=dateString.getFullYear();
    //   var user:any=localStorage.getItem('User_Usuario');
    //   this.periodo.strCreation_User=user;
    //   periodoService.ConsulaPeriodo(yyyy)
    //   .then(response=>{
    //     if(response){
    //       this.$message({
    //         showClose: true,
    //         type: 'info',
    //         message: 'Ya existe periodo'
    //       });
    //     }
    //     else{
    //       periodoService.CreatePeriodo(yyyy,this.periodo.strCreation_User)
    //       .then(resp=>{
    //         this.$message({
    //             showClose: true,
    //               type: 'success',
    //               message: 'Se guardo Correctamente '+yyyy
    //             });
    //             this.issave = true;
    //             this.iserror = false;
    //             this.value3=(new Date()).toString(); 
    //             this.textosave = 'Se guardo correctamente. '+yyyy;
    //         }).catch(error=>{
    //             this.$message({
    //                 showClose: true,
    //                 type: 'error',
    //                 message: 'No se pudo guardar'
    //               });
    //             this.issave = false;
    //             this.iserror = true;
    //             this.textosave = 'Error al guardar.';
    //         })
    //     }
    //   })      
        
    // } 
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
            value3:'',
            gridPeriodo:[]
        }
    }
  
}
