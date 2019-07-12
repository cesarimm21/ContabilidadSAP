import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllsucursal(strCompany_Cod){  
    return axios.get(CONFIG.API_URL+'sucursal/'+strCompany_Cod)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOnesucursal(code){
    return axios.get(CONFIG.API_URL+'sucursal/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Crearsucursal(data){
    return axios.post(CONFIG.API_URL+'sucursal',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Updatesucursal(data){
    return axios.post(CONFIG.API_URL+'sucursal/update',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  Eliminarsucursal(data){
    return axios.post(CONFIG.API_URL+'sucursal/eliminar',data)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
}
  