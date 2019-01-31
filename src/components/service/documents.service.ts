import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    deleteDocuments(intDocID){
        return axios.delete(CONFIG.API_URL+'documentos/delete/'+intDocID+'/'+localStorage.getItem('User_Usuario'), {headers: this.headers})
      .then(response => {
        return response.data
      })
    },
    SearchEstadoDocumento(FormSearch){
      return axios.post(CONFIG.API_URL+'documentos/search/EstadoDocumento',FormSearch,{headers:  {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
    },
    getAllEstadoDocumentos() {
      console.log(this.headers);
      
      return axios.get(CONFIG.API_URL + 'documentos/get/all/EstadoDocumento/'+localStorage.getItem('User_CodPersona'), { headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
      .then(response => {
        return response.data
    })},
    deleteDocumentsNew(intDocID){
      return axios.delete(CONFIG.API_URL+'documentos/deleteNew/'+intDocID+'/'+localStorage.getItem('User_Usuario'), {headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response => {
      return response.data
    })
    },
    deleteDocumentsPublish(intDocID){
      debugger;
      return axios.delete(CONFIG.API_URL+'documentos/deletePublish/'+intDocID+'/'+localStorage.getItem('User_Usuario'), {headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response => {
      return response.data
    })
  }
}