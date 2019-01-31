import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  loadingData(){
    return axios.get(CONFIG.API_URL+'rol/get/all',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
  },
  getAccesos(){
    return axios.get(CONFIG.API_URL+'accesos/get/all',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  getRolAcceso(intRol){
    return axios.get(CONFIG.API_URL+'rolacceso/get/'+intRol,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
      return JSON.parse(JSON.stringify(response.data));
    })
  },
  AgregarRol(FormAgregar){
    return axios.post(CONFIG.API_URL+'rol/put',FormAgregar,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response =>{
      return response.data;
    })
  },
  EditarRol(rowSelectedEdit){
    return axios.post(CONFIG.API_URL+'rol/update', rowSelectedEdit,{headers: this.headers})
    .then(response =>{
      return response.data;
    })
  },
  EliminarRol(row){
    return axios.delete(CONFIG.API_URL+'rol/delete/'+row.intCodRol+'/'+localStorage.getItem('User_Usuario'),{headers: this.headers})
    .then(response => {
      return response.data
    })
  },
  ConsultarRol(FormSearch){
    return axios.post(CONFIG.API_URL+'rol/search', FormSearch,{headers: this.headers})
    .then(response =>{
      return JSON.parse(JSON.stringify(response.data));
    })
  }

}