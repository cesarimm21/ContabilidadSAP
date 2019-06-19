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
  GetOnlyOneTipoMovimiento(code){
    return axios.get(CONFIG.API_URL+'tipomovimiento/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearTipoMovimiento(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento',data)
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
  EliminarTipoMovimiento(data){
    return axios.post(CONFIG.API_URL+'tipomovimiento/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  