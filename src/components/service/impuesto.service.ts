import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllImpuesto(){    
    return axios.get(CONFIG.API_URL+'impuesto')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllImpuesto2(){    
    return axios.get(CONFIG.API_URL+'impuesto2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneImpuesto(code){
    return axios.get(CONFIG.API_URL+'impuesto/'+code)
    .then(response =>{  
      console.log(response);
                
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateImpuesto(impuesto){
    return axios.post(CONFIG.API_URL+'impuesto/create', impuesto)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateImpuesto(impuesto){
    return axios.post(CONFIG.API_URL+'impuesto/update', impuesto)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  DeleteImpuesto(intIdWH_ID,strModified_User){
    return axios.get(CONFIG.API_URL+'impuesto/delete/'+intIdWH_ID+'/'+strModified_User)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'impuesto/activar', data)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
  