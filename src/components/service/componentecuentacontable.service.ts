import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllComponenteCuentaContable(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'componentecuenta/view/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetAllComponenteCuentaContable2(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'componentecuenta2/'+strCompany_Cod)
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
    return axios.post(CONFIG.API_URL+'componentecuenta/create',data)
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
  },
  inactivarComponente(data){
    return axios.post(CONFIG.API_URL+'componentecuenta/inactivar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  activarComponente(data){
    return axios.post(CONFIG.API_URL+'componentecuenta/activar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  