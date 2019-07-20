import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAlltiporenta(){  
    return axios.get(CONFIG.API_URL+'tiporenta')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnetiporenta(code){
    return axios.get(CONFIG.API_URL+'tiporenta/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Creartiporenta(data){
    return axios.post(CONFIG.API_URL+'tiporenta',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatetiporenta(data){
    return axios.post(CONFIG.API_URL+'tiporenta/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminartiporenta(data){
    return axios.post(CONFIG.API_URL+'tiporenta/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'tiporenta/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  