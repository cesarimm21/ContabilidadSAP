import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllAduana(){    
    return axios.get(CONFIG.API_URL+'codigoaduana')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateAduana(comprobante){
    return axios.post(CONFIG.API_URL+'codigoaduana/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateAduana(comprobante){
    return axios.post(CONFIG.API_URL+'codigoaduana/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
