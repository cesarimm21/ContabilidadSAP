import { Vue, Component } from 'vue-property-decorator';
import Router from 'vue-router';
import VueSession from 'vue-session';
import VueLocalStorage from 'vue-localstorage';
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
Vue.use(VueLocalStorage)
@Component({
   name: 'login'
})
export default class LoginComponent extends Vue {
  FormLogin:any;
  gridData: any;
  user:any;
  constructor(){
    super();    
  }
  navegacion(){
      this.$router.push('/barmenu/inicio');
  }
  loginUsuario(FormLogin){            
    let loadingInstance = Loading.service({
      fullscreen: true,
      text: 'Ingresando...',
      spinner: 'el-icon-loading',
      background: 'rgba(0, 0, 0, 0.8)'
      }
      );
      this.$router.push('/barmenu/inicio');
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
      gridData: [],
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
      }
    };
  }
}
