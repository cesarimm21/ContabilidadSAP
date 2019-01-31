import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    loadingData(){
        // console.log("Bearer "+GLOBAL.getToken());        
        return axios.get(CONFIG.API_URL+'dominio/get/all',{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    },
    AgregarDominio(FormAgregar){
        return axios.post(CONFIG.API_URL+'dominio/put', FormAgregar,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return response.data;
          })
    },
    EditarDominio(rowSelectedEdit){
        return axios.post(CONFIG.API_URL+'dominio/update', rowSelectedEdit,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response =>{
            return response.data;
          })
    },
    EliminarDominio(row){
        return axios.delete(CONFIG.API_URL+'dominio/delete/'+row.intCodDominio+'/'+localStorage.getItem('User_Usuario'),{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response => {
            return response.data
          })
    }
}