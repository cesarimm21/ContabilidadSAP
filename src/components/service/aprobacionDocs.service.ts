import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllDocByUser(){
    var codigo_usuario = window.localStorage.getItem('User_CodPersona'); //------------------------dato temporal
    return axios //modificar el numero
      .get(CONFIG.API_URL +'aprobar/get/pendientes/'+codigo_usuario,{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response => {
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  AprobarDocumento(AprobacionesModel){
    AprobacionesModel["CodPersonaAprobador"] = window.localStorage.getItem('User_CodPersona'); //------------------------dato temporal
    AprobacionesModel["Usuario"] = window.localStorage.getItem('User_Usuario'); //------------------------dato temporal
    return axios 
      .post(CONFIG.API_URL + 'aprobar/aprobar/documento', AprobacionesModel , { headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('usuario_token') } })
      .then(response => {
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  DocumentoPublicar(CodDocumentoApro){
    return axios 
      .post(CONFIG.API_URL + 'aprobar/change/publicar/'+ CodDocumentoApro , { headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('usuario_token') } })
      .then(response => {
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  RechazarDocumento(AprobacionesModel){
    AprobacionesModel["CodPersonaAprobador"] = window.localStorage.getItem('User_CodPersona');
    AprobacionesModel["Usuario"] = window.localStorage.getItem('User_Usuario');
    return axios 
      .post(CONFIG.API_URL + 'aprobar/rechazar/documento', AprobacionesModel , { headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('usuario_token') } })
      .then(response => {
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  ModificarDocumento(AprobacionesModel){
    AprobacionesModel["CodPersonaAprobador"] = window.localStorage.getItem('User_CodPersona');
    AprobacionesModel["Usuario"] = window.localStorage.getItem('User_Usuario');
    return axios 
      .post(CONFIG.API_URL + 'aprobar/modificar/documento', AprobacionesModel , { headers: { 'Authorization': 'Bearer ' + window.sessionStorage.getItem('usuario_token') } })
      .then(response => {
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}

