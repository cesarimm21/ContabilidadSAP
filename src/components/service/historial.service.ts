import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
  
  historialNuevo(FormNew){
    return axios.post(CONFIG.API_URL +'historial/post/docHistorial',FormNew,{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  historialAprobado(FormNew){
    return axios.post(CONFIG.API_URL +'historial/post/docAprobado',FormNew,{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  historialPublish(FormNew){
    debugger;
    return axios.post(CONFIG.API_URL +'historial/post/docPublish',FormNew,{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  historialRemove(FormNew){
    return axios.post(CONFIG.API_URL +'historial/post/docRemove',FormNew,{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }
}