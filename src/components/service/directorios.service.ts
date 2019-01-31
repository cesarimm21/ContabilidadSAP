import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
    loadingData(){
      return axios.get(CONFIG.API_URL+'directorio/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    AgregarDirectorio(FormAgregar){
      return axios.post(CONFIG.API_URL+'directorio/put',FormAgregar,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        debugger;
        return response.data;
      })
    },
    EditarDirectorio(FormAgregar){
     return axios.post(CONFIG.API_URL+'directorio/update',FormAgregar,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
     .then(response =>{
      return response.data;
    })
    }
}