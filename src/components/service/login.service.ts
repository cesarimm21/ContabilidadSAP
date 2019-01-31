import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { Message } from '@/typings';
export default {
  headers : {'Access-Control-Allow-Origin':'*'},
  LoginUser(FormLogin){
    return axios.post(CONFIG.API_URL+'membership/login', FormLogin, {headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  Authentification(usuario){
    debugger;
    return axios.post(CONFIG.API_URL+'membership/authentication', usuario)
    .then(response =>{
      window.sessionStorage.setItem('usuario_token',response.data);
      GLOBAL.setToken(response.data)
      return true;
    })
    .catch(e=>{
      // Message.info('Datos incorrectos');
      window.location.reload();       
    })
  },
  getTokenTime(){
    return axios.get(CONFIG.API_URL+'membership/get/token')
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data))
    })
  }
}
