import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoCambioALL(){    
    return axios.get(CONFIG.API_URL+'tipocambio')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoCambio(date){   
    return axios.get(CONFIG.API_URL+'tipocambioByDate/'+date)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoCambioS(date){   
    return axios.get(CONFIG.API_URL+'tipocambioByDates/'+date)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoCambio1(){
    return axios.get(CONFIG.API_URL+'tipocambiotoday')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateTipoCambio(tipocambio){
    return axios.post(CONFIG.API_URL+'tipocambio/create', tipocambio)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateTipoCambio(tipocambio){
    return axios.post(CONFIG.API_URL+'tipocambio/update', tipocambio)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  DeleteTipoCambio(intExchRate_ID,strModified_User){
    return axios.get(CONFIG.API_URL+'tipocambio/delete/'+intExchRate_ID+'/'+strModified_User)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
