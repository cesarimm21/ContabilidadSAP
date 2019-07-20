import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllMetodoDep(){    
    return axios.get(CONFIG.API_URL+'metododepreciacion')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DeleteMetodoDep(data){ 
    return axios.post(CONFIG.API_URL+'metododepreciacion/eliminar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'metododepreciacion/activar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateMetodoDep(comprobante){
    return axios.post(CONFIG.API_URL+'metododepresacion/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateMetodoDep(comprobante){
    return axios.post(CONFIG.API_URL+'metododepresacion/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
