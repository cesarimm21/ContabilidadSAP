import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAlltipooperacion(){  
    return axios.get(CONFIG.API_URL+'tipooperacion')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnetipooperacion(code){
    return axios.get(CONFIG.API_URL+'tipooperacion/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Creartipooperacion(data){
    return axios.post(CONFIG.API_URL+'tipooperacion',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatetipooperacion(data){
    return axios.post(CONFIG.API_URL+'tipooperacion/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminartipooperacion(data){
    return axios.post(CONFIG.API_URL+'tipooperacion/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  