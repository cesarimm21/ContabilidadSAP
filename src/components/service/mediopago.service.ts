import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default{
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetMedioPago(){ 
    return axios.get(CONFIG.API_URL+'mediopago')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetMedioPagoView(){ 
    return axios.get(CONFIG.API_URL+'mediopago/view')
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  deleteMedioPago(intIdPayWay_ID){ 
    return axios.get(CONFIG.API_URL+'mediopago/delete/'+intIdPayWay_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CreateMedioPago(comprobante){
    return axios.post(CONFIG.API_URL+'mediopago/create', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  UpdateMedioPago(comprobante){
    return axios.post(CONFIG.API_URL+'mediopago/update', comprobante)
    .then(response =>{
        return JSON.parse(JSON.stringify(response.data));
      })
  },
  inactivarMedioPago(documento){
    return axios.post(CONFIG.API_URL+'mediopago/inactivar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarMedioPago(documento){
    return axios.post(CONFIG.API_URL+'mediopago/activar',documento)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
