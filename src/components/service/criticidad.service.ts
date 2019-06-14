import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCriticidad(){  
    return axios.get(CONFIG.API_URL+'criticidad')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCriticidad(code){
    return axios.get(CONFIG.API_URL+'criticidad/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearCriticidad(data){
    return axios.post(CONFIG.API_URL+'criticidad',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateCriticidad(data){
    return axios.post(CONFIG.API_URL+'criticidad/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminar(data){
    return axios.post(CONFIG.API_URL+'criticidad/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  