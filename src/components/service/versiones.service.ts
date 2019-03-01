import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  loadingData(){
      return axios.get(CONFIG.API_URL+'usuario/get/all',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllVersion(){
      return axios.get(CONFIG.API_URL+'versiones/get/all/'+window.localStorage.getItem('User_CodPersona'),{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  SearchVersiones(FormSearch){
      return axios.post(CONFIG.API_URL+'versiones/search', FormSearch,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  SearchUsuarios(FormSearchUsu){
      return axios.post(CONFIG.API_URL+'usuario/search', FormSearchUsu,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  VersionesView(FormVersion){
    return axios.post(CONFIG.API_URL+'versiones/view', FormVersion,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
}


}