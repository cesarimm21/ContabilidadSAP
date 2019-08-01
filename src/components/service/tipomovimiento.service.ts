import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllTipoMovimiento(){  
    return axios.get(CONFIG.API_URL+'tipomovimiento')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllTipoMovimiento2(){  
    return axios.get(CONFIG.API_URL+'tipomovimiento2')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneTipoMovimiento(code){
    return axios.get(CONFIG.API_URL+'tipomovimiento/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activar(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearTipoMovimiento(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento/create',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateTipoMovimiento(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  inactivarTipoMovimiento(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  