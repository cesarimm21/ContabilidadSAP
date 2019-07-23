import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllComprobante(){    
    return axios.get(CONFIG.API_URL+'tipocomprobantepago')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllComprobante2(){    
    return axios.get(CONFIG.API_URL+'tipocomprobantepago2')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteComprobante(intIdDocIdent_IDType_ID){    
    return axios.get(CONFIG.API_URL+'tipocomprobantepago/delete/'+intIdDocIdent_IDType_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateTipoComprobante(comprobante){
    return axios.post(CONFIG.API_URL+'tipocomprobantepago/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateTipoComprobante(comprobante){
    return axios.post(CONFIG.API_URL+'tipocomprobantepago/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
