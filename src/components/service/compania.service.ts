import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCompania(){  
    return axios.get(CONFIG.API_URL+'compania')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCompania(code){  
    return axios.get(CONFIG.API_URL+'compania/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCompania(data){
    return axios.post(CONFIG.API_URL+'compania',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCompania(data){
    return axios.post(CONFIG.API_URL+'compania/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  InactivarCompania(data){
    return axios.post(CONFIG.API_URL+'compania/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  ActivarCompania(data){
    return axios.post(CONFIG.API_URL+'compania/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  