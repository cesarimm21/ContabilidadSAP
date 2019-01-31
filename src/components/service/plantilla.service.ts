import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
  PutPlantilla(formData){
    debugger;
    return axios.post(CONFIG.API_URL+'plantilla/put',formData,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return response.data;
    })
  },
  PutFiles(formData,tipoDocumento){
    return axios.post(CONFIG.API_URL+'plantilla/putfile/'+tipoDocumento,formData,{headers:{'Authorization':'Bearer'+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return response.data;
    })
  }
  

}