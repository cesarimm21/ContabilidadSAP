import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    searchEliminado(BuscarEliminado){
        return axios.post(CONFIG.API_URL+'query/irDelete', BuscarEliminado)
        .then(response =>{
            return JSON.parse(JSON.stringify(response.data));
          })
    },
    searchDocumento(SearchForm){
        return axios.post(CONFIG.API_URL+'documento/search/deletedoc',SearchForm,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
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
    }

}