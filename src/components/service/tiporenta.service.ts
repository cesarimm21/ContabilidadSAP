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
  GetAlltiporentaView(){  
    return axios.get(CONFIG.API_URL+'tiporenta/view')
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
    return axios.post(CONFIG.API_URL+'tiporenta/create',data)
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
  inactivarTiporenta(data){
    return axios.post(CONFIG.API_URL+'tiporenta/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarTiporenta(data){
    return axios.post(CONFIG.API_URL+'tiporenta/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  