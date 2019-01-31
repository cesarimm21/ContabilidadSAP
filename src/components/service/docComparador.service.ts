import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    getDocumentsSelect(){
        return axios.get(CONFIG.API_URL+'versiones/get/allPublish',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    },
    getVersionCompare(value){
        return axios.get(CONFIG.API_URL+'versiones/get/'+value,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    },
    SeachDocument(SearchForm){
        return axios.post(CONFIG.API_URL+'docComparer/search',SearchForm,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    SeachDocumentNext(SearchFormNext){
        return axios.post(CONFIG.API_URL+'docComparer/search/select',SearchFormNext,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    ComparadorButton(SearchFormCompare){
        return axios.post(CONFIG.API_URL+'docComparer/post/binary',SearchFormCompare,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    ComparadorClear(SearchFormCompare){
        return axios.post(CONFIG.API_URL+'docComparer/post/clear',SearchFormCompare,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    // ComparadorButton(intCodVersionDoc1){
    //     return axios.get(CONFIG.API_URL+'docComparer/postDoc/'+this.value.intCodVersionDoc1+'/'+this.value1.intCodVersionDoc2)
    //     .then(response=>{
    //         return JSON.parse(JSON.stringify(response.data));
    //     })
    // }
    
}