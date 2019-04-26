import { Vue, Component } from 'vue-property-decorator';
import Router from 'vue-router';


import '../../assets/css/login.scss';
import 'font-awesome/css/font-awesome.css';
import '../../assets/css/slider.scss';
import * as CONFIG from '../../Config';
import axios from 'axios';
import { Loading } from 'element-ui';
import LogComponent from '@/components/log/log.component';
import GLOBAL from '../../Global';
import usuarioService from '@/components/service/usuario.service';
import loginService from '@/components/service/login.service';
import {CompaniaModel} from '@/modelo/maestro/compania';
import companiaService from '@/components/service/compania.service';

@Component({
   name: 'login'
})
export default class LoginComponent extends Vue {
  FormLogin:any;
  gridData: any;
  usuario:string;
  contrasenia:string;
  user:any;
  companiaModel:CompaniaModel[];
  value1:string;
  public companiaSelectModel:CompaniaModel=new CompaniaModel();
  constructor(){
    super();    
    GLOBAL.routeLogin=document.URL;
    this.loadCompania();
  }
  loadCompania(){
    companiaService.GetAllCompania()
    .then(response=>{
      this.companiaModel=response;    
    })
  }
  navegacion(){
      this.$router.push('/barmenu/inicio');
  }
  loginUsuario(FormLogin){            
    // let loadingInstance = Loading.service({
    //   fullscreen: true,
    //   text: 'Ingresando...',
    //   spinner: 'el-icon-loading',
    //   background: 'rgba(0, 0, 0, 0.8)'
    //   }
    //   );
    if(this.usuario=='egaona' && this.contrasenia=='12345' &&this.value1!=''){
      this.$router.push('/barmenu/inicio');
      localStorage.setItem('User_Usuario',this.usuario);
    }
    else{
      this.$message('error login');
    }
    
    // axios.post(CONFIG.API_URL+'membership/login',FormLogin)
    // .then(response =>{
    //     var encoded=btoa(JSON.stringify(response.data));     
    //     var decode=JSON.parse(atob(encoded));      
    //     if(decode.strUsuario==null || decode.strPassword==null){
    //     this.openMessageError('Error en Ingresar Datos');
    //     loadingInstance.close(); 
    //     this.FormLogin.strUsuario='';
    //     this.FormLogin.strPassword=''; 
    //     return;     
    //     }
    //   loginService.Authentification(response.data)
    //   .then(resp => {        
    //     if(decode.strUsuario==null || decode.strPassword==null){
    //       this.openMessageError('Error en Ingresar Datos');
    //       loadingInstance.close(); 
    //       this.FormLogin.strUsuario='';
    //       this.FormLogin.strPassword=''; 
    //       return;     
    //       }
    //     else{
    //       this.openMessage('Bienvenido '+decode.Nombres);
    //       localStorage.setItem('User_Usuario',decode.strUsuario);
    //       localStorage.setItem('User_Nombre',decode.Nombres+', '+decode.ApellidoPaterno+' '+decode.ApellidoMaterno);
    //       localStorage.setItem('User_CodPersona',decode.strCodPersona);
    //       localStorage.setItem('User_CodUsuario',decode.intCodUsuario);
    //       localStorage.setItem('User_Cargo',decode.strCargo);  
    //       localStorage.setItem('User_Mail',decode.Email);   
    //       debugger;        
    //       this.user.authenticated = true;
    //       loadingInstance.close();      
    //       this.$router.push('/barmenu/inicio');
    //       // window.location.reload();
    //     }
    //   }).catch()
    // })
    // .catch(e =>{
    //   loadingInstance.close();
    //   this.openMessageError('Usuario No reguistrado');
    //   this.FormLogin.strUsuario='';
    //   this.FormLogin.strPassword=''; 
    //   this.$router.push('/'); 
    //   console.log(e)
    // })
    
  }
  selectCompania(event){
    for(var i=0;i<=this.companiaModel.length;i++){
      if(this.companiaModel[i].strCompany_Cod==event){
        this.companiaSelectModel=this.companiaModel[i];
        localStorage.setItem('compania_cod',this.companiaSelectModel.strCompany_Cod);
        localStorage.setItem('compania_name',this.companiaSelectModel.strCompany_Name);
      }
    }
    
    
  }
  openMessage(newMsg : string) {
    this.$message({
      showClose: true,
      message: newMsg,
      type: 'success'
    });
  }
  openMessageError(strMessage:string){
    this.$message({
      showClose: true,
      type: 'error',
      message: strMessage
    });
  }
  data() {
    return {
      labelPosition: 'right',
      value1:'',
      gridData: [],
      companiaModel:[],
      user: {
        authenticated: false
      },
      FormLogin:{
        strUsuario:'',
        strPassword:''
      },
      formLabelAlign: {
        name: '',
        region: ''
      },
      usuario:'',
      contrasenia:''
    };
  }
}
