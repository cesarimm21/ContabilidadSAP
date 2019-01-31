import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    searchNuevo(BuscarNuevo){
        debugger;
        return axios.post(CONFIG.API_URL+'query/ir', BuscarNuevo,{headers: this.headers})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    searchDocumento(SearchForm){
        return axios.post(CONFIG.API_URL+'documento/search/new',SearchForm,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    loadingData(){
        return axios.get(CONFIG.API_URL+'usuario/get/all',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    },
    SearchUsuarios(FormSearchUsu){
        return axios.post(CONFIG.API_URL+'usuario/search', FormSearchUsu,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    loadUnidad(){
        return axios.get(CONFIG.API_URL+'documento/get/all/unidad',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    },
    loadTipoAprobacion(){
        return axios.get(CONFIG.API_URL+'documento/get/all/tipoAprobacion',{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    }

}