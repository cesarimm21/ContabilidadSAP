import Vue from 'vue';
import { Component } from 'vue-property-decorator';
import 'font-awesome/css/font-awesome.css';
import { Loading } from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Global from '@/Global';
//***Modelos */
import {PeriodoModel} from '@/modelo/maestro/periodo';
import QuickAccessMenuComponent from '@/components/quickaccessmenu/quickaccessmenu.vue';
import { Notification } from 'element-ui';
import periodoService from '@/components/service/periodo.service';
@Component({
  name: 'crear-periodo',
  components:{
  'quickaccessmenu':QuickAccessMenuComponent,
  }
})
export default class CrearPeriodoComponent extends Vue {
  nameComponent:string;
  fecha_actual:string;
  fecha_ejecucion:string;
  value3:string;
  companyName:any;
  companyCod:any;
  public periodo:PeriodoModel=new PeriodoModel();
  public gridPeriodo:PeriodoModel[];
  public gridData:any[];
  total:number=0;
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
        this.loadYears();
        
    }
    loadYears(){
      periodoService.GetAllYears()
      .then(respo=>{
        this.gridPeriodo=[];
        this.gridPeriodo=respo;
        
        if(this.gridPeriodo.length>0){
          var data:any[]=[];
          this.gridPeriodo.forEach(element => {
            data.push(element.intYear)
          });
          this.gridData = data.filter((x, i, a) => a.indexOf(x) == i)  
          this.total=this.gridData.length;           
          console.log(this.gridData);          
        }
      })
    }
    changeyear(){
      
    }

    guardarPeriodo(){
      var dateString = new Date(this.value3);
      var yyyy=dateString.getFullYear();
      var user:any=localStorage.getItem('User_Usuario');
      this.periodo.strCreation_User=user;
      let loadingInstance = Loading.service({
        fullscreen: true,
        text: 'Guardando...',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.8)'
    }
    );
      periodoService.ConsulaPeriodo(yyyy)
      .then(response=>{
        if(response){
          loadingInstance.close();
          this.$message({
            showClose: true,
            type: 'info',
            message: 'Ya existe Año Fiscal Contable'
          });
        }
        else{
          periodoService.CreatePeriodo(yyyy,this.periodo.strCreation_User)
          .then(resp=>{
            loadingInstance.close();
            this.$message({
                showClose: true,
                  type: 'success',
                  message: 'Se guardo Correctamente Año Fiscal Contable '+yyyy
                });
                this.issave = true;
                this.iserror = false;
                this.value3=(new Date()).toString(); 
                this.textosave = 'Se guardo correctamente Año Fiscal Contable. '+yyyy;
                this.loadYears();
            }).catch(error=>{
              loadingInstance.close();
                this.$message({
                    showClose: true,
                    type: 'error',
                    message: 'No se pudo guardar'
                  });
                this.issave = false;
                this.iserror = true;
                this.textosave = 'Error al guardar.';
            })
        }
      })      
        
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
            value3:'',
            gridPeriodo:[],
            gridData:[],
            total:0
          }
    }
  
}
