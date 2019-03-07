import axios from 'axios';
import * as CONFIG from '../../Config';
import * as APIConstant from '../../core/api.constant';
import GLOBAL from '../../Global';
export default {
  // headers : {'Authorization': 'Bearer '+GLOBAL.getToken()},
  GetAllCuentaContable(){  
    return axios.get(CONFIG.API_URL+'cuentacontable')
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  },
  GetOnlyOneCuentaGastos(code){
    return axios.get(CONFIG.API_URL+'cuentacontable/'+code)
    .then(response =>{           
        return JSON.parse(JSON.stringify(response.data));
    })
  }
}
  