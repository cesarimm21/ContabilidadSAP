import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
  AgregarMsnEnviado(FormAgregar){
    debugger;
    return axios.post(CONFIG.API_URL+'msmEnviado/put',FormAgregar,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return response.data;
    })
  },
  getEmail(){
    return axios.get(CONFIG.API_URL+'msmEnviado/get/email',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  statisticsGraphic(){
    return axios.get(CONFIG.API_URL +'statistics/get/all',{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return response.data;
    })
  },
  documentsCountsGraphic(FormImput){
    return axios.post(CONFIG.API_URL +'statistics/post/docCounts',FormImput,{headers:{'Authorization':'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return response.data;
    })
  },
  DocumentsByUser(FormSearch){
    return axios.post(CONFIG.API_URL+'statistics/post/docByAutor', FormSearch,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
}

}