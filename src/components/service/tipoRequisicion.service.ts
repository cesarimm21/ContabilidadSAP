import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoRequisicion(){  
    return axios.get(CONFIG.API_URL+'tiporequisicion')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneTipoRequisicion(code){
    return axios.get(CONFIG.API_URL+'tiporequisicion/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearTipoRequisicion(data){
    return axios.post(CONFIG.API_URL+'tiporequisicion/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateTipoRequisicion(data){
    return axios.post(CONFIG.API_URL+'tiporequisicion/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarTipoRequisicion(intIdTypeReq_ID){    
    return axios.get(CONFIG.API_URL+'tiporequisicion/delete/'+intIdTypeReq_ID)
    .then(response =>{            
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  DesactivarTipoRequisicion(data){
    return axios.post(CONFIG.API_URL+'tiporequisicion/desactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarRequisicion(data){
    return axios.post(CONFIG.API_URL+'tiporequisicion/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  