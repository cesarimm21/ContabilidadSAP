import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllComponenteCuentaContable(){  
    return axios.get(CONFIG.API_URL+'componentecuenta')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllComponenteCuentaContableFiltro(data){  
    return axios.get(CONFIG.API_URL+'componentecuenta/'+data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  CrearComponete(data){
    return axios.post(CONFIG.API_URL+'componentecuenta',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  UpdateComponenteCuenta(data){
    return axios.post(CONFIG.API_URL+'componentecuenta/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  EliminarComponente(data){
    return axios.post(CONFIG.API_URL+'componentecuenta/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  