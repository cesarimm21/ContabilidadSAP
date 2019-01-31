import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
    loadingData(){
      return axios.get(CONFIG.API_URL+'docAccesos/get/'+localStorage.getItem('User_CodPersona'),{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
    loadingUserDocumento(CodDocumento){
        return axios.get(CONFIG.API_URL+'docAccesos/getUser/'+CodDocumento,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
          return JSON.parse(JSON.stringify(response.data));
      })
      },
      EliminarUsuarioAcceso(row,CodDocumento){
        return axios.delete(CONFIG.API_URL+'docAccesos/delete/'+row.CodPersona+'/'+CodDocumento,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response => {
            return response.data
          })
    },
    InsertUsuarioAcceso(CodPersona,CodDocumento){
      return axios.post(CONFIG.API_URL+'docAccesos/insert/'+CodPersona+'/'+CodDocumento,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response => {
          return JSON.parse(JSON.stringify(response.data));
        })
  },
    SearchPersonas(CodDocumento,FormSearchPers){
      return axios.post(CONFIG.API_URL+'docAccesos/search/'+CodDocumento,FormSearchPers,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    },
    SearchPersonasForm(CodDocumento,FormSearch){
      return axios.post(CONFIG.API_URL+'docAccesos/searchPer/'+CodDocumento,FormSearch,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    },
    SearchDocumentoAcceso(FormSearchAcceso){
      return axios.post(CONFIG.API_URL+'docAccesos/search', FormSearchAcceso,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    }
}