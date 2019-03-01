import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
    headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
    loadingData(ProcesoEjecModel){
        // console.log("Bearer "+GLOBAL.getToken());    
        return axios.post(CONFIG.API_URL+'query/post/getProcesos',ProcesoEjecModel,{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return response.data;
        })
    } ,
    reloadProceso(DocumentoModel){
        // console.log("Bearer "+GLOBAL.getToken()); 
        return axios.post(CONFIG.API_URL+'query/post/execute',DocumentoModel,{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return response.data;
        })
    }   
}