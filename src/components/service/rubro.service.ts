import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllRubro(){  
    return axios.get(CONFIG.API_URL+'rubro')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllRubro2(){  
    return axios.get(CONFIG.API_URL+'rubro2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneRubroCuenta(codigo){
    return axios.get(CONFIG.API_URL+'rubro/'+codigo)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  createRubro(data){
    return axios.post(CONFIG.API_URL+'rubro',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  eliminarRubro(data){
    return axios.post(CONFIG.API_URL+'rubro/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarRubro(data){
    return axios.post(CONFIG.API_URL+'rubro/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  updateRubro(data){
    return axios.post(CONFIG.API_URL+'rubro/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  