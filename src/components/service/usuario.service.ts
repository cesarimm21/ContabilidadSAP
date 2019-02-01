import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
    loadingData(){
      return axios.get(CONFIG.API_URL+'usuario/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    loadingDataPersona(){
      return axios.get(CONFIG.API_URL+'usuario/get/allpersonas',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    getDominios(){
      return axios.get(CONFIG.API_URL+'dominio/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    getRoles(){
      return axios.get(CONFIG.API_URL+'rol/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    getJerarquia(){
      return axios.get(CONFIG.API_URL+'jerarquia/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    getTipoPersona(){
      return axios.get(CONFIG.API_URL+'tipoPersona/get/all',{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    AgregarUsuario(FormAgregar){
      return axios.post(CONFIG.API_URL+'usuario/put',FormAgregar,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        debugger;
        return response.data;
      })
    },
    EliminarUsuario(row){
      return axios.delete(CONFIG.API_URL+'usuario/delete/'+row.intCodUsuario+'/'+localStorage.getItem('User_Usuario'),{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response => {
        return response.data
      })
    },
    EditarUsuario(rowSelectedEdit){
     return axios.post(CONFIG.API_URL+'usuario/update',rowSelectedEdit,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
     .then(response =>{
      return response.data;
    })
    },
    ConsultarUsuarios(FormSearch){
      return axios.post(CONFIG.API_URL+'usuario/search',FormSearch,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    },
    SearchPersonas(FormSearchPers){
      return axios.post(CONFIG.API_URL+'usuario/searchPersonas',FormSearchPers,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    },
    GetUsuarioAccesos(){
      return axios.get('/assets/data/accesodata.json')
      .then(response=>{
        return response.data;
      })
    },
    // GetUsuarioAccesos(strCargo){
    //     return axios.get(CONFIG.API_URL+'usuario/get/accesos/'+strCargo,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    //     .then(response =>{
    //       localStorage.setItem('usuario_accesos', JSON.stringify(response.data));
    //       return JSON.parse(JSON.stringify(response.data));          
    //     })
    //   },
      loginUsuarioRegistrer(FormLogin){
        return axios.post(CONFIG.API_URL+'usuario/post/login',FormLogin,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{          
          return response.data;
        })
      }
}