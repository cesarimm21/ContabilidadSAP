import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
import { log } from 'util';
export default{
  headers : {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')},
  loadingDataNewDocuments(){
    // console.log("Bearer "+GLOBAL.getToken());        
    return axios.post(CONFIG.API_URL+'portlets/get/allNew/'+window.localStorage.getItem('User_CodPersona'),{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
    .then(response=>{
        return JSON.parse(JSON.stringify(response.data));
    })
    },
 loadingDataPublishDocuments(){
        // console.log("Bearer "+GLOBAL.getToken());        
        return axios.post(CONFIG.API_URL+'portlets/get/allPublish/'+window.localStorage.getItem('User_CodPersona'),{headers:{'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
    }
}