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
  GetAlltipooperacionView(){  
    return axios.get(CONFIG.API_URL+'tipooperacion/view')
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
    return axios.post(CONFIG.API_URL+'tipooperacion/create',data)
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
  inactivarTipooperacion(data){
    return axios.post(CONFIG.API_URL+'tipooperacion/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarTipooperacion(data){
    return axios.post(CONFIG.API_URL+'tipooperacion/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  