import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllServicioPrestado(){    
    return axios.get(CONFIG.API_URL+'servicioprestado')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DeleteServicioPrestado(intIdNDServ_ID){    
    return axios.get(CONFIG.API_URL+'servicioprestado/delete/'+intIdNDServ_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateServicioPrestado(comprobante){
    return axios.post(CONFIG.API_URL+'servicioprestado/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateServicioPrestado(comprobante){
    return axios.post(CONFIG.API_URL+'servicioprestado/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
