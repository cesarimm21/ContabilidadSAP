import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllExoOperaciones(){    
    return axios.get(CONFIG.API_URL+'exoneracionoperaciones')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllExoOperacionesView(){    
    return axios.get(CONFIG.API_URL+'exoneracionoperaciones/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarExoOperaciones(data){   
    return axios.post(CONFIG.API_URL+'exoneracionoperaciones/inactivar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarExoOperaciones(data){
    return axios.post(CONFIG.API_URL+'exoneracionoperaciones/activar',data)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateExoOperaciones(comprobante){
    return axios.post(CONFIG.API_URL+'exoneracionoperaciones/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateExoOperaciones(comprobante){
    return axios.post(CONFIG.API_URL+'exoneracionoperaciones/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  }
}
