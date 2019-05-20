import axios from 'axios';
import * as CONFIG from '../../Config';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  getPagoDataCod(strPayRun_NO){
    return axios.get(CONFIG.API_URL+'runpagos/'+strPayRun_NO,{headers: {'Authorization': 'Bearer '+window.sessionStorage.getItem('usuario_token')}})
        .then(response=>{
            return JSON.parse(JSON.stringify(response.data));
        })
  },
  CreateRunPagos(pago){    
    return axios.post(CONFIG.API_URL+'runpagos',pago)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  }

}