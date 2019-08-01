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
  GetAllMetodoDepView(){    
    return axios.get(CONFIG.API_URL+'metododepreciacion/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarMetodoDep(data){ 
    return axios.post(CONFIG.API_URL+'metododepreciacion/inactivar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarMetodoDep(data){
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
